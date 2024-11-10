import postDb from "../Models/Posts-model.js"


export const sendPost = async (req, res) => {
    const { title, description } = req.body;
    const authorID = req.user._id;

    const postData = new postDb({
        postedby: authorID,
        title,
        description,
        username: req.user.username

    })

    await postData.save();

    res.status(200).json({
        message: "post uploaded"

    })
}

export const getPost = async (req, res) => {
    try {
        const autherId = req.user._id;

        const data = await postDb.find({ postedby: autherId }).select("-postedby");

        res.status(200).json(
            {
                posts: data

            }

        )

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

export const getAllPosts = async (req, res) => {
    try {
        const data = await postDb.find({}).select("-postedby");
        res.status(200).json({
            posts: data

        })

    } catch (error) {
        res.status(200).json({
            message: error

        })

    }

}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedata = await postDb.findByIdAndUpdate({ _id: id }, { title, description },
            { new: true, runValidators: true }
        )

        if (!updatedata) {
            return res.status(400).json({
                message: "Post not found"

            })
        }

        res.status(200).json({
            message: "Post Updated Successfully",
            data: updatedata
        })

    } catch (error) {

    }

}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postDb.deleteOne({ _id: id })
        if (!post) {
            return res.status(400).json({
                message: "Post not deleted"
            })
        }

        res.status(200).json({
            message: "post deleted !"
        })

    } catch (error) {

    }

}