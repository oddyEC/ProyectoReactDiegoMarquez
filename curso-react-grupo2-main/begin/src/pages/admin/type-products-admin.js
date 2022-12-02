import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";

export const TipoProductoCreate = () => {
  const [tipoProducto, setTipoProducto] = useState({});
  //const [clientCategory, setClientCategory] = useState([]);

  const [loading, setLoading] = useState(false);

  const navegacion = useNavigate();

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    setTipoProducto((tipoProductoCurrent) => ({
      ...tipoProductoCurrent,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      console.log("Enviar...");
      console.log(tipoProducto);
      clientHttp.post(`/TipoProducto`, tipoProducto).then((response) => {
        navegacion(`/admin/type-products`);
      });
    }
  };

  const { id, nombre } = tipoProducto;

  return loading ? (
    <div>Loading data...</div>
  ) : (
    <form className="row" onSubmit={(e) => handleSubmit(e)}>
      <div className="col-6">
        <label htmlFor="id" className="form-label">
          Id
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="id"
            value={id}
            onChange={(e) => handleChange(e)}
            required
            maxLength="30"
          />
          <div className="invalid-feedback">Id es obligatoria</div>
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => handleChange(e)}
            required
            maxLength="80"
          />
          <div className="invalid-feedback">Nombre es obligatorio</div>
        </div>
      </div>

      <div className="col-12 mt-3">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={(e) => navegacion(`/admin/clients`)}
        >
          Cancelar
        </button>
        <button className="btn btn-primary ms-3" type="submit">
          Guardar
        </button>
      </div>
    </form>
  );
};

export const TipoProductoEdit = () => {
  const [tipoProducto, setTipoProducto] = useState({});
  //const [clientCategory, setClientCategory] = useState([]);

  const [loading, setLoading] = useState(true);
  const { tipoProductoId } = useParams();

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/TipoProducto/${tipoProductoId}`).then((response) => {
      setTipoProducto(response.data);
      setLoading(false);
    });
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    setTipoProducto((tipoProductoCurrent) => ({
      ...tipoProductoCurrent,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      //console.log("Enviar...");
      //console.log(client);
      clientHttp
        .put(`/TipoProducto/?id=${tipoProductoId}`, tipoProducto)
        .then((response) => {
          navegacion(`/admin/type-products`);
        });
    }
  };

  const { id, nombre } = tipoProducto;

  return loading ? (
    <div>Loading data...</div>
  ) : (
    <form className="row" onSubmit={(e) => handleSubmit(e)}>
      <div className="col-6">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => handleChange(e)}
            required
            maxLength="80"
          />
          <div className="invalid-feedback">Nombre es obligatorio</div>
        </div>
      </div>

      <div className="col-12 mt-3">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={(e) => navegacion(`/admin/type-products`)}
        >
          Cancelar
        </button>
        <button className="btn btn-primary ms-3" type="submit">
          Guardar
        </button>
      </div>
    </form>
  );
};

export const TipoProductoEliminar = () => {
  const [tipoProducto, setTipoProducto] = useState({});
  //const [clientCategory, setClientCategory] = useState([]);

  const [loading, setLoading] = useState(true);
  const { tipoProductoId } = useParams();

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/TipoProducto/${tipoProductoId}`).then((response) => {
      setTipoProducto(response.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      //console.log("Enviar...");
      //console.log(client);
      clientHttp
        .delete(`/TipoProducto/?marcaId=${tipoProductoId}`, tipoProducto)
        .then((response) => {
          navegacion(`/admin/type-products`);
        });
    }
  };

  return (
    <form className="row" onSubmit={(e) => handleSubmit(e)}>
      <table className="table">
        <thead>
          <tr>
            <th>Identificación</th>
            <th>Nombres</th>
          </tr>
        </thead>
        <tbody>
          <tr key={tipoProducto.id}>
            <td>{tipoProducto.id}</td>
            <td>{tipoProducto.nombre}</td>
          </tr>
        </tbody>
      </table>
      <div className="col-12 mt-3">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={(e) => navegacion(`/admin/type-products`)}
        >
          Cancelar
        </button>
        <button className="btn btn-primary ms-3" type="submit">
          Eliminar
        </button>
      </div>
    </form>
  );
};

const TipoProductoList = () => {
  const [tipoProductos, setTipoProductos] = useState([]);

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/TipoProducto`).then((response) => {
      //console.log(response);
      setTipoProductos(response.data);
    });
  }, []);

  const handlerEditar = (TipoProducto) => {
    navegacion(`/admin/type-products/${TipoProducto.id}`);
  };

  const handlerEliminar = (TipoProducto) => {
    navegacion(`/admin/type-productsD/${TipoProducto.id}`);
  };

  const handlerCrear = () => {
    navegacion(`/admin/type-productsC`);
  };

  return (
    <table className="table">
      <thead>
        <td>
          <button onClick={(e) => handlerCrear()}>Crear TipoProducto</button>
        </td>
        <tr>
          <th>Identificación</th>
          <th>Nombres</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {tipoProductos.map((cli) => (
          <tr key={cli.id}>
            <td>{cli.id}</td>
            <td>{cli.nombre}</td>

            <td>
              <button onClick={(e) => handlerEditar(cli)}>Editar</button>
              <button onClick={(e) => handlerEliminar(cli)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function TypeProductAdmin() {
  return <TipoProductoList />;
}
