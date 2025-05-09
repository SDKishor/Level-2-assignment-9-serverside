import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { postService } from "./post.service";

const createPost = catchAsync(async (req, res) => {
  const result = await postService.createPost(req.body);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to create post",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "post created successfully",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await postService.getAllPosts();
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to get posts",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "posts retrieved successfully",
    data: result,
  });
});

const getPostById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await postService.getPostById(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "Post not found",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Post retrieved successfully",
    data: result,
  });
});

const getPostsByCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await postService.getPostsByCategory(categoryId);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "No posts found",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Posts retrieved successfully",
    data: result,
  });
});

const getPostByAuthor = catchAsync(async (req, res) => {
  const { authorId } = req.params;
  const result = await postService.getPostByAuthor(authorId);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "No posts found",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Posts retrieved successfully",
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await postService.updatePost(id, req.body);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to update post",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Post updated successfully",
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await postService.deletePost(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to delete post",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Post deleted successfully",
    data: result,
  });
});

const approvePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await postService.approvePost(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to approve post",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Post approved successfully",
    data: result,
  });
});

const rejectPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await postService.rejectPost(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to reject post",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Post rejected successfully",
    data: result,
  });
});

const toggleIsPremiumPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await postService.toggleIsPremiumPost(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to toggle post premium status",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Post premium status toggled successfully",
    data: result,
  });
});

export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByCategory,
  getPostByAuthor,
  updatePost,
  deletePost,
  approvePost,
  rejectPost,
  toggleIsPremiumPost,
};
