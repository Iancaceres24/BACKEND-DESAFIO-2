import fs from "fs";


export default class ProductManager{
    constructor(){
        this.path = "./files/productos.json"
    }

    
    getProducts = async () => {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path,"utf-8")
            const product = JSON.parse(data)
            return product
        }else{
            return []        
        }

        }
    
        addProduct = async(productos)=>{
            const product = await this.getProducts();
            if(product.length === 0){
                productos.id = 1 
            }else{
                productos.id = product[product.length-1].id + 1
            }
            product.push(productos);
            await fs.promises.writeFile(this.path,JSON.stringify(product,null,"\t"))
            return product
        }

        getProductsById = async (productos) =>{
            try {
            const product = await this.getProducts();

            const buscarId = product.find(producto => producto.id === productos.id );

            if (buscarId) {
                return buscarId;
            } else {
                console.log(`No se encontró un producto con el ID ${productos.id}`);
                return null;

                
        }}
            catch (error) {
                console.error("Error al buscar producto por ID:", error);
                throw error;
            }
        

    

    }

    updateProduct = async (id, update) => {
        try {
            const products = await this.getProducts();
            const buscarId = products.find(producto => producto.id === id);
    
            if (buscarId) {
                const updatedProduct = { ...buscarId, ...update };
    
            updatedProduct.id = id;
    
            const updatedProducts = products.map(product => (product.id === id ? updatedProduct : product));
    
            await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, "\t"));
    
                return updatedProduct;
            } else {
                console.log(`No se encontró un producto con el ID ${id}`);
                return null;
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            throw error;
        }
    };
    
    deleteProduct = async (id) =>{
        
            try {
                const product = await this.getProducts();
                
                const productos = product.findIndex(producto => producto.id === id )
                if (productos !== -1) {
                    product.splice(productos, 1);
                    await fs.promises.writeFile(this.path, JSON.stringify(product, null, "\t"));

                    console.log("Producto eliminado")}else{
                        console.log(`No se encontró un producto con el ID ${id}`);
                    }
                    
            }
                catch (error) {
                    console.error("Error al eliminar el producto por ID:", error);
                    throw error;
                }
    }




}
        

    



