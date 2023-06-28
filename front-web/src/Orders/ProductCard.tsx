
import { EpiDTO, ItemSolicitacaoDTO } from "./types";

type Props ={
    product: EpiDTO
    onSelectProduct: (product: EpiDTO) => void;
    isSelected: boolean;
}

console.log()
function ProductCard({ product, onSelectProduct, isSelected }: Props){

  function onError(e: any) {
    e.target.src = '/epi_imgs/epi_padrao.jpg';
  }
    return(
        
      <div 
        className={`order-card-container ${isSelected ? 'selected' : ''}`}
        onClick={() => onSelectProduct(product)}
      >
        <h3 className="order-card-title">
            {}
        </h3>
        <img 
            //src={require('../epi_imgs/CA5745.jpg')}
            //src={'./CA5745.jpg'}
            src= {'/epi_imgs/'+product.codigo+'.jpg'}
            className="order-card-image" 
            alt={product.codigo}
            onError={(e) => onError(e)}
        />
        <div className="order-card-description">
            {/* <h3>Descricão</h3> */}
            <p>
            {product.descricao}
            </p>

        </div>
      </div>
    )
}

export default ProductCard;