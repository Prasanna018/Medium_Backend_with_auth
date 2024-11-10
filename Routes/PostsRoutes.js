import { Router } from "express";
const router = Router();
import { deletePost, getAllPosts, getPost, sendPost, updatePost } from "../Controllers/PostsController.js";
import { secureRoute } from "../Middleware/secureRoute.js";


router.post("/send-post", secureRoute, sendPost);
router.get('/get-posts', secureRoute, getPost);
router.get('/get-all-posts', getAllPosts);
router.put('/update-post/:id', secureRoute, updatePost);
router.delete('/delete-post/:id', secureRoute, deletePost)
// router.get('/view-profile', secureRoute, getProfileData);

export default router;