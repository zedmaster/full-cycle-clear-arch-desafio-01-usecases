import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";

import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import OrderRepository from "./order.repository";
import OrderModel from "./order.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";


describe("Order repository test", () => {


    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create an order", async () => {
        
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua 1", "Bairro 1", "Cidade 1", "Estado 1", "12345678");
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        
        
        const order = new Order("1", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);


        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"] 
        });


        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: order.id,
                product_id: product.id
            }]
        })

    })


    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua 1", "Bairro 1", "Cidade 1", "Estado 1", "12345678");
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        
        
        const order = new Order("1", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Rua 2", "Bairro 2", "Cidade 2", "Estado 2", "12345678");
        customer2.changeAddress(address2);

        customerRepository.create(customer2);

        order.changeCustomer(customer2.id);
        const orderItem2 = new OrderItem("2", product.name, product.price, product.id, 5);

        order.addItem(orderItem2);

        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer2.id,
            total: order.total(),
            items: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: order.id,
                product_id: product.id
            }, {
                id: orderItem2.id,
                name: orderItem2.name,
                price: orderItem2.price,
                quantity: orderItem2.quantity,
                order_id: order.id,
                product_id: product.id
            }]

        })
        
    })


    it("should not update an order if some error occurs on update process", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua 1", "Bairro 1", "Cidade 1", "Estado 1", "12345678");
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        
        
        const order = new Order("1", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const inexistentCustomerId = "2";

        order.changeCustomer(inexistentCustomerId);

        await expect(async ()=> {
            await orderRepository.update(order);
        }).rejects.toThrowError("Error updating order");

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
        })

        expect(orderModel.customer_id).toBe(customer.id);

    })

    it("should find an order by id", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua 1", "Bairro 1", "Cidade 1", "Estado 1", "12345678");
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        
        
        const order = new Order("1", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        const orderFound = await orderRepository.find(order.id);

        expect(orderModel.toJSON()).toStrictEqual({
            id: orderFound.id,
            customer_id: customer.id,
            total: orderFound.total(),
            items: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: order.id,
                product_id: product.id
            }]
        });
    })


    it("should throw an error when trying to find an order by id that does not exist", async () => {
        const orderRepository = new OrderRepository();
        await expect(orderRepository.find("1")).rejects.toThrowError("Order not found");
    })

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const orderRepository = new OrderRepository();
        const productRepository = new ProductRepository();

        const address1 = new Address("Rua 1", "Bairro 1", "Cidade 1", "Estado 1", "12345678");
        const customer1= new Customer("1", "Customer 1");
        customer1.changeAddress(address1);
        await customerRepository.create(customer1);

        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem1 = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("1", customer1.id, [orderItem1]);
        await orderRepository.create(order);


        const address2 = new Address("Rua 2", "Bairro 2", "Cidade 2", "Estado 2", "12345678");
        const customer2= new Customer("2", "Customer 2");
        customer2.changeAddress(address1);
        await customerRepository.create(customer2);

        const product2 = new Product("2", "Product 2", 20);
        await productRepository.create(product2);

        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 5);
        const order2 = new Order("2", customer2.id, [orderItem2]);
        await orderRepository.create(order2);


        const ordersFound = await orderRepository.findAll()
        

        expect(ordersFound).toHaveLength(2);
        expect(ordersFound).toContainEqual(order);
        expect(ordersFound).toContainEqual(order2);

    })





})