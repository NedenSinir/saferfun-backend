import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(
    @Request() req,
    @Body() commentData: { content: string; coinId: string },
  ) {
    return this.commentsService.create(
      req.user.walletAddress,
      commentData.content,
      commentData.coinId,
    );
  }

  @Get(':coinId')
  async getComments(@Param('coinId') coinId: string) {
    return this.commentsService.findByCoinId(coinId);
  }
}
