import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url, UrlDocument } from './schemas/url.schema';
import { CreateUrlDto } from './dto/create-url.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Url.name) private urlModel: Model<UrlDocument>,
    private configService: ConfigService,
  ) {}

  async createShortUrl(
    createUrlDto: CreateUrlDto,
  ): Promise<{ originalUrl: string; shortUrl: string }> {
    const { url, customCode } = createUrlDto;

    let shortCode = customCode;

    if (!shortCode) {
      // Generate a unique short code
      shortCode = this.generateShortCode();

      // Ensure uniqueness
      while (await this.urlModel.findOne({ shortCode })) {
        shortCode = this.generateShortCode();
      }
    } else {
      // Check if custom code already exists
      const existingUrl = await this.urlModel.findOne({ shortCode });
      if (existingUrl) {
        throw new ConflictException('Custom code already exists');
      }
    }

    // Create new URL document
    const newUrl = new this.urlModel({
      originalUrl: url,
      shortCode,
    });

    await newUrl.save();

    const baseUrl = this.configService.get<string>('BASE_URL') || 'http://localhost:3000';
    const shortUrl = `${baseUrl}/r/${shortCode}`;

    return {
      originalUrl: url,
      shortUrl,
    };
  }

  async redirectToOriginalUrl(shortCode: string): Promise<string> {
    const url = await this.urlModel.findOne({ shortCode });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    // Increment clicks
    await this.urlModel.updateOne({ shortCode }, { $inc: { clicks: 1 } });

    return url.originalUrl;
  }

  async getUrlStats(
    shortCode: string,
  ): Promise<{ originalUrl: string; shortUrl: string; clicks: number }> {
    const url = await this.urlModel.findOne({ shortCode });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    const baseUrl = this.configService.get<string>('BASE_URL') || 'http://localhost:3000';
    const shortUrl = `${baseUrl}/r/${shortCode}`;

    return {
      originalUrl: url.originalUrl,
      shortUrl,
      clicks: url.clicks,
    };
  }

  private generateShortCode(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
