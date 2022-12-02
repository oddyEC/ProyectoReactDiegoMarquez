import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";


export const ProductEdit = () => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    clientHttp.get(``).then((response) => setProduct(response.data));
  }, []);

  return (
    <form>
      <div className="col-md-4">
        <label htmlFor="validationCustomUsername" className="form-label">
          Username
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="validationCustomUsername"
            required
          />
          <div className="invalid-feedback">Please choose a username.</div>
        </div>
      </div>
    </form>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/Producto`).then((response) => {
      setProducts(response.data.lista);
    });
  }, []);
  const handlerEditar = (product) => {
    navegacion(`/admin/products/${product.id}`);
  };
  const handlerEliminar = (product) => {
    clientHttp.delete(`/Producto?marcaId=${product.id}`).then(() => {
      alert("Elemento eliminado");
      navegacion(`/admin/products`);
    });
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Observaciones</th>
          <th>Caducidad</th>
          <th>Marca ID</th>
          <th>Tipo Producto ID</th>
        </tr>
      </thead>
      <tbody>
        {products.map((cli) => (
          <tr key={cli.id}>
            <td>{cli.nombre}</td>
            <td>${cli.precio}.00</td>
            <td>{cli.observaciones}</td>
            <td>{cli.caducidad}</td>
            <td>{cli.marcaId}</td>
            <td>{cli.tipoProductoId}</td>
            <td>
              <button onClick={(e) => handlerEditar(cli)}>Editar</button>
            </td>
            <td>
              <button onClick={(e) => handlerEliminar(cli)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function ProductAdmin() {
  return <ProductList />;
}
