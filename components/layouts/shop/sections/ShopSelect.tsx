import React from "react";
//@ts-ignore
import Select, { StylesConfig, ActionMeta } from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRecoilState } from "recoil";
import { getProducts, handelFilterProduct, OrderByAtom, ProductsAtom, TokenAtom } from "../../../../helper";
import { orderBySchema } from "../../../../helper/validation";

export interface optionType {
  value: string;
  label: string;
}

interface IFormInputs {
  orderBy: string;
}

const ShopSelect = () => {
  const [orderByState, setOrderByState] = useRecoilState(OrderByAtom);
  const [productsState, setProductsState] = useRecoilState(ProductsAtom);
  const [token,setToken]=useRecoilState(TokenAtom)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(orderBySchema),
  });



  const customStyles: StylesConfig<optionType> = {
    option: (provided: ActionMeta, state: ActionMeta) => ({
      ...provided,
      borderBottom: "1px solid #F8F8F8",
      color: state.isSelected ? "#373737" : "#373737",
    }),
    control: (base: ActionMeta) => ({
      ...base,
      "&:hover": { borderColor: "gray" },
      border: "1px solid black",
      boxShadow: "none",
      paddingTop: 5,
      paddingBottom: 5,
    }),
  };
  return (
    <div className="inline-block sm:w-[100%] md:w-[25%]  lg:w-[22%]">
      <form >
        <Controller
          name="orderBy"
          control={control}
          render={({ field: { onChange, value, name, ref } }) => {
            const handleSelectChange = async (
              selectedOption: optionType | null
            ) => {
              const res = await getProducts(token,"",-1,[],selectedOption?.label);
              console.log(res);
              
              setProductsState(res.result.items)
            };
            return (
              <Select
                theme={(theme: ActionMeta) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary: "gray",
                  },
                })}
                className="w-full  "
                ref={ref}
                name={name}
                placeholder="Order By"
                options={orderByState}
                onChange={handleSelectChange}
                styles={customStyles}
                isSearchable={false}
              />
            );
          }}
        />
      </form>
    </div>
  );
};

export default ShopSelect;
