import React, { useEffect } from "react";
//@ts-ignore
import Select, { StylesConfig, ActionMeta } from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { OrderByAtom } from "../../../../helper";
import { orderBySchema } from "../../../../helper/validation";
import { useRouter } from "next/router";
import { FiltersQueryAtom } from "./MainSection";

export interface optionType {
  value: string;
  label: string;
}

interface IFormInputs {
  orderBy: string;
}

const ShopSelect = () => {
  const orderByState = useRecoilValue(OrderByAtom);
  const setQueryFilters = useSetRecoilState(FiltersQueryAtom);

  const { control } = useForm<IFormInputs>({
    resolver: yupResolver(orderBySchema),
  });

  const { query, replace } = useRouter();

  useEffect(() => {
    if (typeof query.orderby === "string") {
      //@ts-ignore
      setQueryFilters((prev) => {
        return { ...prev, orderby: query.orderby };
      });
    }
  }, [query.orderby]);

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
    <div className="inline-block sm:w-[100%] md:w-[25%]  lg:w-[22%] ">
      <form>
        <Controller
          name="orderBy"
          control={control}
          render={({ field: { name, ref } }) => {
            const handleSelectChange = async (
              selectedOption: optionType | null
            ) => {
              if (selectedOption?.label != null) {
                replace(
                  {
                    query: { ...query, orderby: selectedOption?.label },
                  },
                  undefined,
                  {
                    scroll: false,
                  }
                );

                setQueryFilters((prev) => {
                  return { ...prev, orderby: selectedOption?.label };
                });
              }
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
                placeholder="OrderByNewest"
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
