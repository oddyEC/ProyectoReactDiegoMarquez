//import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../componentes/layout";
import ClientsAdmin, { ClientCreate, ClientEdit, ClientEliminar } from "../pages/admin/clients-admin";
import ProductAdmin, { ProductoCreate, ProductoEdit, ProductoEliminar } from "../pages/admin/products-admin";
import TypeProductAdmin, { TipoProductoCreate, TipoProductoEdit, TipoProductoEliminar } from "../pages/admin/type-products-admin";

export default [
    
    {
        name: "Clientes",
        key:"clients-admin",
        route: "/admin/clients",
        component: <ClientsAdmin  />,
        showLink:true
    },
    {
        name: "Editar Clientes ",
        key:"clients-edit-admin",
        route: "/admin/clients/:clientId",
        component: <ClientEdit  />,
        showLink:false
    },
    {
        name: "Eliminar Clientes ",
        key:"clients-delete-admin",
        route: "/admin/clientsD/:clientId",
        component: <ClientEliminar  />,
        showLink:false
    },
    {
        name: "Crear Clientes ",
        key:"clients-create-admin",
        route: "/admin/clientsC",
        component: <ClientCreate  />,
        showLink:false
    },
    {
        name: "Tipos de Productos",
        key:"type-products-admin",
        route: "/admin/type-products",
        component: <TypeProductAdmin />,
        showLink:true
    },
    {
        name: "Eliminar TipoProductos ",
        key:"tipoProductos-delete-admin",
        route: "/admin/type-productsD/:tipoProductoId",
        component: <TipoProductoEliminar  />,
        showLink:false
    },
    {
        name: "Editar Tipo Productos ",
        key:"tipoProductos-edit-admin",
        route: "/admin/type-products/:tipoProductoId",
        component: <TipoProductoEdit  />,
        showLink:false
    },
    {
        name: "Crear TipoProductos ",
        key:"clients-create-admin",
        route: "/admin/type-productsC",
        component: <TipoProductoCreate  />,
        showLink:false
    },{
        name: "Administración Productos ",
        key:"products-admin",
        route: "/admin/products",
        component: <ProductAdmin />,
        showLink:true
    },{
        name: "Eliminar Productos ",
        key:"productos-delete-admin",
        route: "/admin/productsD/:productoId",
        component: <ProductoEliminar />,
        showLink:false
    },
    {
        name: "Editar Productos ",
        key:"productos-edit-admin",
        route: "/admin/products/:productoId",
        component: <ProductoEdit  />,
        showLink:false
    },
    {
        name: "Crear Productos ",
        key:"products-create-admin",
        route: "/admin/productsC",
        component: <ProductoCreate  />,
        showLink:false
    }
    
];