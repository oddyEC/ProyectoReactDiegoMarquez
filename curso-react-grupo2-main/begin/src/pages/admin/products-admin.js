import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";

export const ProductoCreate = () => {
  const [producto, setProducto] = useState({});
  const [marca, setMarca] = useState([]);
  const [tipoProducto, setTipoProducto] = useState([]);

  const [loading, setLoading] = useState(false);

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/Marca`).then((response) => {
      setMarca(response.data);
    });
  }, []);

  useEffect(() => {
    clientHttp.get(`/TipoProducto`).then((response) => {
      setTipoProducto(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    setProducto((productoCurrent) => ({ ...productoCurrent, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      console.log("Enviar...");
      console.log(producto);
      clientHttp.post(`/Producto`, producto).then((response) => {
        navegacion(`/admin/products`);
      });
    }
  };

  const { nombre, precio, observaciones, caducidad, marcaId, tipoProductoId } =
    producto;

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
            maxLength="15"
          />
          <div className="invalid-feedback">Identificación es obligatoria</div>
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="precio" className="form-label">
          Precio
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="precio"
            value={precio}
            onChange={(e) => handleChange(e)}
            required
            maxLength="10"
          />
          <div className="invalid-feedback">Precio es obligatorio</div>
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="observaciones" className="form-label">
          Observaciones{" "}
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="observaciones"
            value={observaciones == null ? "" : observaciones}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="caducidad" className="form-label">
          Caducidad Ej: (2022-12-01T23:44:20.592)
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="caducidad"
            value={caducidad}
            onChange={(e) => handleChange(e)}
            required
            maxLength="80"
          />
          <div className="invalid-feedback">Caducidad es obligatorio</div>
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="marcaId" className="form-label">
          Marca
        </label>
        <select
          className="form-select"
          id="marcaId"
          value={marcaId}
          required
          onChange={(e) => handleChange(e)}
        >
          <option disabled value="">
            Seleccionar Marca
          </option>
          {marca.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">Marca es requerido</div>
      </div>

      <div className="col-6">
        <label htmlFor="tipoProductoId" className="form-label">
          TipoProducto
        </label>
        <select
          className="form-select"
          id="tipoProductoId"
          value={tipoProductoId}
          required
          onChange={(e) => handleChange(e)}
        >
          <option disabled value="">
            Seleccionar TipoProducto
          </option>
          {tipoProducto.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">TipoProducto es requerido</div>
      </div>

      <div className="col-12 mt-3">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={(e) => navegacion(`/admin/products`)}
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

export const ProductoEdit = () => {
  const [producto, setProducto] = useState({});
  const [marca, setMarca] = useState([]);
  const [tipoProducto, setTipoProducto] = useState([]);

  const [loading, setLoading] = useState(true);
  const { productoId } = useParams();

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/Producto/${productoId}`).then((response) => {
      setProducto(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    clientHttp.get(`/Marca`).then((response) => {
      setMarca(response.data);
    });
  }, []);

  useEffect(() => {
    clientHttp.get(`/TipoProducto`).then((response) => {
      setTipoProducto(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    setProducto((productoCurrent) => ({ ...productoCurrent, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      console.log("Enviar...");
      console.log(producto);
      clientHttp
        .put(`/Producto?id=${productoId}`, producto)
        .then((response) => {
          navegacion(`/admin/products`);
        });
    }
  };

  const { nombre, precio, observaciones, caducidad, marcaId, tipoProductoId } =
    producto;

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
            maxLength="30"
          />
          <div className="invalid-feedback">Nombre es obligatoria</div>
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="precio" className="form-label">
          Precio
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="precio"
            value={precio}
            onChange={(e) => handleChange(e)}
            required
            maxLength="80"
          />
          <div className="invalid-feedback">Precio es obligatorio</div>
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="observaciones" className="form-label">
          Observaciones{" "}
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="observaciones"
            value={observaciones == null ? "" : observaciones}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="caducidad" className="form-label">
          Caducidad
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="caducidad"
            value={caducidad}
            onChange={(e) => handleChange(e)}
            required
            maxLength="80"
          />
          <div className="invalid-feedback">Caducidad es obligatorio</div>
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="marcaId" className="form-label">
          Marca
        </label>
        <select
          className="form-select"
          id="marcaId"
          value={marcaId}
          required
          onChange={(e) => handleChange(e)}
        >
          <option disabled value="">
            Seleccionar Marca
          </option>
          {marca.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">Marca es requerido</div>
      </div>

      <div className="col-6">
        <label htmlFor="tipoProductoId" className="form-label">
          TipoProducto
        </label>
        <select
          className="form-select"
          id="tipoProductoId"
          value={tipoProductoId}
          required
          onChange={(e) => handleChange(e)}
        >
          <option disabled value="">
            Seleccionar TipoProducto
          </option>
          {tipoProducto.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">TipoProducto es requerido</div>
      </div>

      <div className="col-12 mt-3">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={(e) => navegacion(`/admin/products`)}
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

export const ProductoEliminar = () => {
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(true);
  const { productoId } = useParams();

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/Producto/${productoId}`).then((response) => {
      setProducto(response.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      clientHttp
        .delete(`/Producto/?marcaId=${productoId}`, producto)
        .then((response) => {
          navegacion(`/admin/products`);
        });
    }
  };

  return (
    <form className="row" onSubmit={(e) => handleSubmit(e)}>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Observaciones</th>
            <th>Caducidad</th>
            <th>Marca</th>
            <th>TipoProducto</th>
          </tr>
        </thead>
        <tbody>
          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>{producto.precio}</td>
            <td>{producto.observaciones}</td>
            <td>{producto.caducidad}</td>
            <td>{producto.marca}</td>
            <td>{producto.tipoProducto}</td>
          </tr>
        </tbody>
      </table>
      <div className="col-12 mt-3">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={(e) => navegacion(`/admin/products`)}
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

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/Producto`).then((response) => {
      //console.log(response);
      setProducts(response.data.lista);
    });
  }, []);

  const handlerEditar = (products) => {
    navegacion(`/admin/products/${products.id}`);
  };

  const handlerEliminar = (products) => {
    navegacion(`/admin/productsD/${products.id}`);
  };

  const handlerCrear = () => {
    navegacion(`/admin/productsC`);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <td>
            <button onClick={(e) => handlerCrear()}>Añadir Productos</button>
          </td>
        </tr>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Observaciones</th>
          <th>Caducidad</th>
          <th>Marca</th>
          <th>TipoProducto</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {products.map((cli) => (
          <tr key={cli.id}>
            <td>{cli.id}</td>
            <td>{cli.nombre}</td>
            <td>{cli.precio}</td>
            <td>{cli.observaciones}</td>
            <td>{cli.caducidad}</td>
            <td>{cli.marca}</td>
            <td>{cli.tipoProducto}</td>
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

export default function ProductsAdmin() {
  return <ProductsList />;
}
