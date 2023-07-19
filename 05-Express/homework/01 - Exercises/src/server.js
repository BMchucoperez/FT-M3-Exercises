const express = require("express");

let publications = [];

const server = express();

server.use(express.json());


let id = 1;
server.post("/posts", (req, res) => {
    const {author, title, contents} = req.body;

    if(!author || !title || !contents){
        return res.status(400).json({error: "No se recibieron los parámetros necesarios para crear la publicación"})
    }
    else{
        const publication = {
            author,
            title,
            contents,
            id: id++
        }
        publications.push(publication);

        res.status(200).json(publication)
    }
})

server.get("/posts", (req, res) => {
    const {author, title} = req.query;
    
    if(author && title){
        const publicationsFiltered = publications.filter(publi => publi.author === author && publi.title === title);
        res.status(200).json(publicationsFiltered);
    }
    else{
        return res.status(400).json({error: "No existe ninguna publicación con dicho título y autor indicado"})
    }
})

server.get("/posts/:author", (req, res) => {
    const {author} = req.params;
    
    if(author){
        const publicationsFiltered = publications.filter(publi => publi.author === author);
        res.status(200).json(publicationsFiltered);
    }
    else{
        return res.status(400).json({error: "No existe ninguna publicación del autor indicado"})
    }
})

server.put("/posts/:id", (req, res)=>{
    const {id} = req.params;
    const {title, contents} = req.body;

    if(title&&contents&&id){
        const publicationId = publications.find(publi => publi.id === Number(id))

        !publicationId
        ? res.status(400).json({error: "No se recibió el id correcto necesario para modificar la publicación"})
        : (
            publicationId = {...publicationId, title, contents}
            && res.status(200).json(publicationId)
        )
    }
    else{
        return res.status(400).json({error: "No se recibieron los parámetros necesarios para modificar la publicación"})
    }
})

server.delete("/posts/:id", (req, res) => {
    const {id} = req.params;
    
    if(!id){
        return res.status(400).json({error: "No se recibió el id de la publicación a eliminar"})
    }
    else{
        let publicationsFiltered = publications.find(publi => publi.id !== Number(id))

        if(publications.length === publicationsFiltered.length){
            return res.status(400).json({error: "No se recibió el id correcto necesario para eliminar la publicación"})
        }

        publications = publicationsFiltered;

        res.status(200).json({success: true})
       
    }
})

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
