import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DeepseekService } from './deepseek.service';

@Controller('deepseek')
export class DeepSeekController {
  constructor(private readonly deepSeekService: DeepseekService) {}

  @Get('ask')
  async askQuestion(@Query('question') question: string): Promise<string> {
    if (!question) {
      throw new HttpException(
        'Please provide a question!',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.deepSeekService.askQuestion(question);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
