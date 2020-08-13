const models = require('../models');

//Création d'un commentaire
exports.createComment = (req, res) => {
        models.Comment.create({ userId: req.body.id, content: req.body.content, postId: req.params.id})
        .then(() => { res.status(201).json({ message: 'Commentaire publié !'}) })
        .catch(error => res.status(400).json({ error }));
}

//Suppression d'un commentaire
exports.deleteComment =  (req, res) => {
    models.Comment.findOne({ where: { postid: req.params.id } })
        .then(() => {
                models.Comment.destroy()
                    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                    .catch(error => res.status(400).json({ error }));  
        })
        .catch(error => res.status(500).json({ error }));
};