let forumPosts = [];

exports.getForumPosts = (req, res) => {
    res.status(200).json(forumPosts);
};

exports.addForumPost = (req, res) => {
    const { content } = req.body;
    const newPost = { content, date: new Date() };
    forumPosts.push(newPost);
    res.status(201).json(newPost);
};
