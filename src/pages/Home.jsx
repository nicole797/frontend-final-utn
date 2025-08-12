import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"

const Home = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [showPopup, setShowPopup] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")
  const [formError, setFormError] = useState("")
  // simulando existencia del usuario, proximamente este estado será global
  const { user } = useAuth()

 const fetchingProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error cargando productos", err);
    }
  }

  // El array vacío (dependencias) espera a que ejecute el return del jsx. Si tiene algo, useEffect se va a ejecutar cada vez que se modifique lo que este dentro de la dependencia.
  useEffect(() => {
    fetchingProducts()
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id != id))
      // fetchingProducts()
    }
  }

  const handleOpenEdit = (product) => {
    setShowPopup(true)
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }

  // petición al backend mediante fetch para modificar-> método PATCH / PUT https://fakeproductapi.com/products
  const handleUpdate = async (e) => {
    e.preventDefault()

    if (!titleEdit.trim()) { setFormError("El título es obligatorio"); return; }
    if (!priceEdit || Number(priceEdit) <= 0) { setFormError("El precio debe ser mayor a 0"); return; }
    if (!descriptionEdit.trim()) { setFormError("La descripción es obligatoria"); return; }

    setFormError("")
    
    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      })

      if (response.ok) {
        const data = await response.json();
        setProducts(prev => prev.map(p => p.id === productToEdit.id ? data : p));
        setShowPopup(false);
      } else {
        setFormError("No se pudo actualizar (respuesta no OK)");
      }
    } catch (error) {
      console.log(error);
      setFormError("Error de red al actualizar");
    }
  }

  // filtrado en tiempo real por título
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <Layout>
      <section className="app-container">
        <h1>Bienvenido a Nuestra Tienda</h1>
        <p>Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.</p>
      </section>

      <section  className="app-container mt-4">
        <h2>¿Por qué elegirnos?</h2>
        <ul>
          <li>
            <h3>Envíos a todo el país</h3>
            <p>Recibí tu compra en la puerta de tu casa estés donde estés.</p>
          </li>
          <li>
            <h3>Pagos seguros</h3>
            <p>Trabajamos con plataformas que garantizan tu seguridad.</p>
          </li>
          <li>
            <h3>Atención personalizada</h3>
            <p>Estamos disponibles para ayudarte en todo momento.</p>
          </li>
        </ul>
      </section>

      <section className="app-container mt-4">
        <h2>Nuestros productos</h2>
        <p>Elegí entre nuestras categorías más populares.</p>

        {/* input de busqueda */}
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar productos"
          />
        </div>
        {
          showPopup && <section className="card mb-3">
            <h2>Editando producto.</h2>
            <button className="btn btn-sm btn-outline-secondary mb-2"onClick={() => setShowPopup(null)}>Cerrar</button>
            <form onSubmit={handleUpdate}>
              <div className="mb-2">
                <input className="form-control"
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
              />
              </div>
              <div className="mb-2">
                <input className="form-control"
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
              </div>
              <div className="mb-2">
                <textarea className="form-control"
                placeholder="Ingrese la descripción"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              ></textarea>
              </div>
              <div className="mb-2">
                <input className="form-control"
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
              </div>
              <div className="mb-2">
                <input className="form-control"
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              />
              </div>
              {formError && <div className="form-error">{formError}</div>}

              <button className="btn btn-primary mt-2" type= "submit">Actualizar</button>
            </form>
          </section>
        }

        <div className="product-grid">
          {
            products.map((product) => <div className="card" key={product.id}>
              <h2 key={product.id}>{product.title}</h2>
              <img src={product.image} alt={`Imagen de ${product.title}`} style={{width: '100%', height: 200, objectFit: 'contain'}}/>
              <p  className="product-price">${product.price}</p>
              <p style={{fontSize: 0.9}}>{product.description.slice(0, 120)}{product.description.length>120?"...":""}</p>
              <p className="text-muted" style={{fontSize: 0.9}}><strong>{product.category}</strong></p>
              {
                user && <div>
                  <button onClick={() => handleOpenEdit(product)}>Actualizar</button>
                  <button onClick={() => handleDelete(product.id)}>Borrar</button>
                </div>
              }
            </div>)
          }
        </div>
      </section>
    </Layout>
  )
}

export { Home }
