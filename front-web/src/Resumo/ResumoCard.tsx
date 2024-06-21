
import { EpiDTO } from "../Orders/types";

type Props = {
  product: EpiDTO
  registro: string
}

function ProductCard({ product, registro }: Props) {

  var repoGitImg = 'https://eduardomalone.github.io/img/epi_imgs/'

  function onError(e: any) {
    e.target.src = '/epi_imgs/epi_padrao.jpg';
  }
  return (
    <>
      <div className="order-card-container">
        <h3 className="order-card-title">
        </h3>
        <div>
          <img
            //src= {'/codigo_barras.jpeg'}
            src={repoGitImg + "" + product.codigo + '.jpg'}
            //src={'/epi_imgs/' + product.codigo + '.jpg'}
            className="order-card-image"
            alt={product.codigo}
            onError={(e) => onError(e)}
          />
        </div>
        <div className="order-card-description">
          <h3>Descricão:</h3>
          <p>
            {product.descricao}
          </p>
        </div>
      </div>
    </>
  )
}

export default ProductCard;