const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
//POO
class ProductsService{

    constructor(){
        this.productos = [];
        //la funcion se corre aca siempre me va a generar esos 100 productos
        this.generate();
    }

    //metodo
    generate(){
      const limit = 100;
      for(let i = 0; i < limit; i++){
        this.productos.push({
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.url(),
          isBlock: faker.datatype.boolean(),
        });
      }
    }


    async create(data){
      const newProduct = {
        id: faker.string.uuid(),
        ...data
      };
      this.productos.push(newProduct);
      return newProduct;
    }

    async find(){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.productos);
        }, 5000);
      });
    }

    async findOne(id){
      const product = this.productos.find(item => item.id === id);
      if(!product){
        throw boom.notFound('Product not found');
      }
      if(product.isBlock){
        throw boom.conflict('Product is block');
      }
      return product;
    }

    async update(id, changes){
      const index = this.productos.findIndex(item => item.id === id);
      if( index === -1){
        throw boom.notFound('Product not found');
      }
      const product = this.productos[index];
      this.productos[index] = {
        ...product,
        changes
      };

      return this.productos[index];

    }

    async delete(id){
      const index = this.productos.findIndex(item => item.id === id);
      if(index === -1){
        throw boom.notFound('product not found');
      }
      this.productos.splice(index, 1);
      return { id };
    }
}

module.exports = ProductsService;
