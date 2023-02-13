import ProductItem from "../ProductItem";

interface ProductListProps {
  products: any[];
  searchTerm: string;
  price: number;
  categoryId: string;
  brandId: string;
}

function ProductList(props: ProductListProps) {
  return (
    <ul className="list">
      {props.products
        .filter((product) => {
          const { title, price, type, brand } = product;
          if (props.searchTerm === "") {
            if( price <= props.price && props.categoryId !== '' && props.brandId !== '')
            {
              return type === props.categoryId && brand === props.brandId
            }
            else if( price <= props.price && props.categoryId === '' && props.brandId !== '')
            {
              return brand === props.brandId
            }
            else if( price <= props.price && props.categoryId === '' && props.brandId == '')
            {
              return price <= props.price;
            }
            else if( price <= props.price && props.categoryId !== '' && props.brandId === '')
            {
              return brand === props.categoryId
            }
            else
            {
              return price <= props.price;
            }
          } else if (
            title
              .toLocaleLowerCase()
              .includes(props.searchTerm.toLocaleLowerCase())
          ) {
            return price <= props.price && props.categoryId !== ''
              ? type === props.categoryId || brand === props.brandId
              : price <= props.price;
          }
        })
        .map((product) => {
          const { _id, photo, title, description, price, brand, info, type, sku } = product;

          return (
            <ProductItem
              key={_id}
              _id={_id}
              photos={photo}
              title={title}
              description={description}
              price={price}
              info={info}
              brand={brand}
              type={type}
              sku={sku}
            />
          );
        })}
    </ul>
  );
}

export default ProductList;
