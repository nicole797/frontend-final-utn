import { useState } from "react";
import { Layout } from "../components/Layout";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !price || !description) {
      setError("Debes completar todos los campos");
      return;
    }

    if (name.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      return;
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      category: "",
      image: ""
    };

    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });

    const data = await response.json();
    setProduct(data);
    setName("");
    setPrice("");
    setDescription("");
  };

  return (
    <Layout>
      <h1 className="text-center mb-4">Panel de Administración</h1>

      <section className="dashboard-section container">
        <h2 className="mb-3">Cargar nuevo producto</h2>
        <form className="dashboard-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre del producto:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Precio:</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción:</label>
            <textarea
              rows="4"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          {error && <p className="text-danger mb-3">{error}</p>}

          <button className="btn btn-primary w-100 mb-5">Guardar producto</button>
        </form>

        {product && (
          <div className="card mt-4 p-3 shadow-sm">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export { Dashboard };

