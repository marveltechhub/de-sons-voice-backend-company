import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { text } = req.body;

    let imageUrl = "";
    let musicUrl = "";

    if (req.files?.image) {
      const imageUpload = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: "posts/images" }
      );
      imageUrl = imageUpload.secure_url;
    }

    if (req.files?.music) {
      const musicUpload = await cloudinary.uploader.upload(
        req.files.music[0].path,
        {
          folder: "posts/music",
          resource_type: "video", // REQUIRED for audio
        }
      );
      musicUrl = musicUpload.secure_url;
    }

    const post = await Post.create({
      user: req.user._id,
      text,
      image: imageUrl,
      music: musicUrl,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "fullName")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your posts" });
  }
};
