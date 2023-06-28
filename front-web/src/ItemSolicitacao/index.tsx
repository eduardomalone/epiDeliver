import './styles.css';
//import {ReactComponent as Logo} from './eng.svg'

function ItemSolicitacao(){
    return(

<>
    <div>
        <h1>ItemSolicitacao zzzzzzz</h1>
      </div>
      <div>
    <h1>User</h1>
    <div>
      <div className="row">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value="{values.name}" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value="{values.email}"/>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label>Country</label>
          {/* <CountrySelector name="country" value={''} /> */}
        </div>
        <div className="form-group">
          <label>Province</label>
          {/* {values.country
            ? <ProvinceSelector name="province" value={values.province} onChange={onChange} />
            : <span>Select a country first</span>
          } */}
        </div>
      </div>
    </div>
  </div>


</>

      


    )
}

export default ItemSolicitacao;