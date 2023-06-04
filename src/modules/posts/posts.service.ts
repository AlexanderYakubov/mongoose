import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostModel } from './post.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel.name) private readonly PostModel: Model<PostModel>,
  ) { }

  async create(createPostDto: CreatePostDto) {
    const createdPost = new this.PostModel(createPostDto);
    return await createdPost.save();
  }

  async findAll() {
    return await this.PostModel.find().exec();
    return `This action returns all posts`;
  }

  async findOne(id: string) {
    return await this.PostModel.findById(id).exec();
    return `This action returns a #${id} post`;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.PostModel.findByIdAndUpdate(id, updatePostDto);
    return `This action updates a #${id} post`;
  }

  async remove(id: string) {
    return await this.PostModel.findByIdAndDelete(id);
    return `This action removes a #${id} post`;
  }
}
