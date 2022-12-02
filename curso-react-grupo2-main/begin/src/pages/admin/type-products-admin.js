import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";

export const TypeProductEdit = () => {
  const [typeProduct, setTypeProduct] = useState({});
  const { typeProductId } = useParams();

  useEffect(() => {
    clientHttp.get(``).then((response) => setTypeProduct(response.data));
  }, []);

  return (
    <form>
      <div className="col-md-4">
        <label for="validationCustomUsername" className="form-label">
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
const TypeProductList = () => {
  const [typeProducts, setTypeProducts] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    clientHttp.get("/TipoProducto").then((response) => {
      setTypeProducts(response.data);
    });
  }, []);
  const handlerEditar = (typeProduct) => {
    navigation(`/admin/typeProducts/${typeProduct.id}`);
  };
  const handlerEliminar = (typeProduct) => {
    clientHttp.delete(`/TipoProducto?marcaId=${typeProduct.id}`).then(() => {
      alert("Elemento eliminado");
      navigation(`/admin/typeProducts`);
    });
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {typeProducts.map((cli) => (
          <tr key={cli.id}>
            <td>{cli.id}</td>
            <td>{cli.nombre}</td>
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
export default function TypeProductAdmin() {
  return <TypeProductList />;
}
