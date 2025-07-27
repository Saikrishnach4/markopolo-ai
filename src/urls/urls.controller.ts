import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Res,
  HttpStatus,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlResponseDto, UrlStatsResponseDto } from './dto/url-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('URL Shortener')
@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('api/shorten')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Shorten a URL (Requires Authentication)' })
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
  })
  async shortenUrl(
    @Body(new ValidationPipe()) createUrlDto: CreateUrlDto,
    @Request() req,
  ): Promise<UrlResponseDto> {
    return this.urlsService.createShortUrl(createUrlDto, req.user.userId);
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get URL analytics (Requires Authentication)' })
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
  })
  async getUrlStats(
    @Param('shortCode') shortCode: string,
    @Request() req,
  ): Promise<UrlStatsResponseDto> {
    return this.urlsService.getUrlStats(shortCode);
  }
}
