
import ProductManager from "./manager/managerProductos.js";


const Manproductos = new ProductManager()

const eve = async() =>{
    let primeraConsulta =  await Manproductos.getProducts()
    console.log(primeraConsulta)
    let producto1=
        { 
        
        title: "Manzana",
        description: "Una Dulce Manzana",
        price: "$20",
        thumbnail: "url",
        code: "1435",
        stock:"100"
    }
    let producto2={ 
        
        title: "Pera",
        description: "Una Jugoza Pera",
        price: "$25",
        thumbnail: "url",
        code: "1436",
        stock:"50"
    }
    let producto3={ 
        
        title: "Banana",
        description: "Una Rica Banana",
        price: "$15",
        thumbnail: "url",
        code: "1437",
        stock:"35"
    }

    let result = await Manproductos.addProduct(producto1)
        result = await Manproductos.addProduct(producto2)
        result = await Manproductos.addProduct(producto3)
        console.log(result)

    let buscar = await Manproductos.getProductsById({id: 1})
    if (buscar) {
        console.log(`El producto que buscaste es: ${JSON.stringify(buscar)}`);
    } else {
        console.log(`No se encontró un producto con el ID mencionado`);
    }

    const update = {
        
        price: "$100",
        
    };
    
    const updatedProduct = await Manproductos.updateProduct(1, update);
    
    if (updatedProduct) {
        console.log("Producto actualizado:", updatedProduct);
    } else {
        console.log(`No se pudo actualizar el producto con el ID 1`);
    }}

    const eliminar = await Manproductos.deleteProduct(2)
    console.log(eliminar)


eve()