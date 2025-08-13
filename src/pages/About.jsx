import { Layout } from "../components/Layout"

const About = () => {
  return (
    <Layout>
      <h1>Sobre Nosotros</h1>
      <section>
        <h2>De qué trata el proyecto</h2>
        <p>Este proyecto es una tienda online de ropa enfocada en ofrecer prendas modernas y de alta calidad para jóvenes. Nuestra plataforma permite explorar una amplia variedad de estilos, facilitando la compra de manera rápida, segura y cómoda desde cualquier dispositivo.</p>
      </section>

      <section>
        <h2>A quién está dirigido</h2>
        <p>Nuestra tienda está diseñada para todo público, tanto mujeres como hombres, que valoran la moda contemporánea y la calidad. Buscamos atender a personas de diferentes edades y estilos de vida, ofreciendo opciones versátiles que se adaptan a diversas necesidades y gustos.</p>
      </section>

      <section>
        <h2>Qué tecnologías o enfoques se usaron</h2>
        <p>El proyecto está desarrollado con React para una interfaz dinámica y Vite para un entorno de desarrollo rápido. Se emplea React Router para la navegación y Context API para manejar el estado global, además de validaciones de formularios y diseño responsive para mejorar la experiencia del usuario.</p>
      </section>
    </Layout>
  );
};

export {About}