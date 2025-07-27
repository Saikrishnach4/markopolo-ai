import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Res,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlResponseDto, UrlStatsResponseDto } from './dto/url-response.dto';

@ApiTags('URL Shortener')
@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('api/shorten')
  @ApiOperation({ summary: 'Shorten a URL' })
  @ApiBody({ type: CreateUrlDto })
  @ApiResponse({
    status: 201,
    description: 'URL shortened successfully',
    type: UrlResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Custom code already exists',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid URL format',
  })
  async shortenUrl(
    @Body(new ValidationPipe()) createUrlDto: CreateUrlDto,
  ): Promise<UrlResponseDto> {
    return this.urlsService.createShortUrl(createUrlDto);
  }

  @Get('r/:shortCode')
  @ApiOperation({ summary: 'Redirect to original URL' })
  @ApiParam({
    name: 'shortCode',
    description: 'The short code for the URL',
    example: 'abc123',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirect to original URL',
  })
  @ApiResponse({
    status: 404,
    description: 'URL not found',
  })
  async redirectToOriginalUrl(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ): Promise<void> {
    const originalUrl = await this.urlsService.redirectToOriginalUrl(shortCode);
    res.redirect(HttpStatus.FOUND, originalUrl);
  }

  @Get('api/stats/:shortCode')
  @ApiOperation({ summary: 'Get URL analytics' })
  @ApiParam({
    name: 'shortCode',
    description: 'The short code for the URL',
    example: 'abc123',
  })
  @ApiResponse({
    status: 200,
    description: 'URL statistics retrieved successfully',
    type: UrlStatsResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'URL not found',
  })
  async getUrlStats(
    @Param('shortCode') shortCode: string,
  ): Promise<UrlStatsResponseDto> {
    return this.urlsService.getUrlStats(shortCode);
  }
}
