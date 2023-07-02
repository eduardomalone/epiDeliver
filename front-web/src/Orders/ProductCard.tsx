import { EpiDTO } from "./types";

type Props = {
  product: EpiDTO
  onSelectProduct: (product: EpiDTO) => void;
  isSelected: boolean;
}

function ProductCard({ product, onSelectProduct, isSelected }: Props) {
  console.log(' ##### ProductCard ####')
  var repoGitImg = 'https://eduardomalone.github.io/img/epi_imgs/'

  // busca img padrao
  function onError(e: any) {
    e.target.src = '/epi_imgs/epi_padrao.jpg';
  }

  return (
    <div
      className={`order-card-container ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelectProduct(product)}
    >
      <h3 className="order-card-title">
      </h3>
      <img
        //src= {'/epi_imgs/'+product.codigo+'.jpg'}
        src={repoGitImg + "" + product.codigo + '.jpg'}
        className="order-card-image"
        alt={product.codigo}
        onError={(e) => onError(e)}
      />
      <div className="order-card-description">
        <p>
          {product.descricao}
        </p>
      </div>
    </div>
  )
}

export default ProductCard;