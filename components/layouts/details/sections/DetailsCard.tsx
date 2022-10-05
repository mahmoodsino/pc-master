import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import {
  addToCart,
  AllCartsInfo,
  CouninueAsGuestModalAtom,
  deleteWishList,
  DetailsAtom,
  DetailsType,
  FetchedCartItemsAtom,
  getCartItems,
  getWishList,
  items,
  NewCartAtom,
  OpenAddToWishListAtom,
  SelectedBranchAtom,
  TokenAtom,
  Variation,
  VariationAtom,
  WishListAtom,
} from "../../../../helper";
import { BaseButton } from "../../../buttons";
import {
  BlusIcon,
  CartIcon,
  HeartIcon,
  MinusIcon,
  RedHeartIcon,
} from "../../../icons";
import { Spinner } from "../../../spinner";
import { AddToWishList } from "../../wishlist";
import useModifiers from "./Modifiers";
import { MoveToCartPageModalAtom } from "./MoveToCartPageModal";
import useProtectPurchaseCard, { modifiersIdAtom } from "./ProtectPurchaseCard";

const DetailsCard = () => {
  const [detailsState, setDetailState] = useRecoilState(DetailsAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [variationState, setVariationState] = useRecoilState(VariationAtom);
  const [openAddToWishList, setOpenAddToWishList] = useRecoilState(
    OpenAddToWishListAtom
  );
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const [ContinueAsGuestModal, setContinueAsGuestModal] = useRecoilState(
    CouninueAsGuestModalAtom
  );
  const [names, setNames] = useState<any>({});
  const [isChange, setIsChange] = useState<boolean>(true);
  const [selectedAttributes, setSelectedAttributes] = useState<number[]>([]);
  const [attributeValueNumbers, setAttributeValueNumber] = useState<any>();
  const [boolAttributeValue, setBoolAttributeValue] = useState<{
    [key: number]: boolean;
  }>({});
  const [newArrayOFArray, setNewArrayOFArry] = useState<any>();
  const [attributeToSetVAriation, setAttributesToSetVAriation] = useState<{
    id: number;
    parent: number;
  }>();
  const { modifiersId, render } = useProtectPurchaseCard();
  const [carts, setCarts] = useRecoilState(FetchedCartItemsAtom);

  const [newCart, setNewCart] = useRecoilState(NewCartAtom);
  const [removeLoading, setRemoveLoading] = useState(false);
  const { modifiersIdforModifiers, modifiersRender } = useModifiers();
  const [allModifires, setAllModifiers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfo);
  const [MoveToCartPageModalState, setMoveToCartPageModalState] =
    useRecoilState(MoveToCartPageModalAtom);
    const [selectedBranch,setSelectedBranch]=useRecoilState(SelectedBranchAtom)

  useEffect(() => {
    if (modifiersId !== 0) {
      setAllModifiers([]);
      modifiersIdforModifiers.map((item) => {
        setAllModifiers((prev) => [...prev, item]);
      });
      setAllModifiers((prev) => [...prev, modifiersId]);
    } else {
      setAllModifiers([]);
      modifiersIdforModifiers.map((item) => {
        setAllModifiers((prev) => [...prev, item]);
      });
    }
  }, [modifiersIdforModifiers, modifiersId]);

  const handleAddToCart = async (clickedItem: DetailsType) => {
    setNewCart((prev) => {
      const isItemInCarts = prev.find((item) =>
        modifiersId === 0
          ? item.product_id === clickedItem.product.id &&
            item.variation_id === variationState.id
          : item.product_id === clickedItem.product.id &&
            item.variation_id === variationState.id &&
            item.modifierGroups?.find(
              (modifier) =>
                modifier === allModifires.find((all) => modifier === all)
            ) !== undefined
      );
      if (isItemInCarts) {
        return prev.map((item) =>
          modifiersId === 0
            ? item.product_id === clickedItem.product.id &&
              item.variation_id === variationState.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
            : item.product_id === clickedItem.product.id &&
              item.variation_id === variationState.id &&
              item.modifierGroups?.find(
                (modifier) =>
                  modifier === allModifires.find((all) => modifier === all)
              ) !== undefined
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...clickedItem,
          type: 1,
          quantity: 1,
          product_id: clickedItem.product.id,
          branch_id: selectedBranch.id,
          description: "item",
          modifierGroups: allModifires,
          variation_id: variationState.id,
        },
      ];
    });
  };
  useEffect(() => {
    setNewCart([]);
    if (variationState.in_stock === 1) {
      if (detailsState.product.tracking_type === 1) {
        setNewCart([
          {
            ...detailsState,
            type: 1,
            quantity: 1,
            product_id: detailsState.product.id,
            branch_id: selectedBranch.id,
            description: "item",
            modifierGroups: allModifires,
            variation_id: variationState.id,
          },
        ]);
      } else if (detailsState.product.tracking_type === 2 || 3) {
        if (variationState.available_quantity !== 0) {
          setNewCart([
            {
              ...detailsState,
              type: 1,
              quantity: 1,
              product_id: detailsState.product.id,
              branch_id: selectedBranch.id,
              description: "item",
              modifierGroups: allModifires,
              variation_id: variationState.id,
            },
          ]);
        }
      }
    }
  }, [variationState, modifiersId, allModifires]);

  const handleRemoveFromCart = async (id: number, reomve?: string) => {
    setNewCart((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack;
          if (reomve) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as items[])
    );
  };


  useEffect(() => {
    let index: number;
    const newNames = names;
    for (let i = 0; i < detailsState.variations.length; i++) {
      const attributes = detailsState?.variations[i]?.attributes;
      if (attributes)
        for (let j = 0; j < attributes.length; j++) {
          const attribute = attributes[j];
          const Parent_id: number = attribute.id;
          let attribute_value = {
            id: attribute.attribute_values.id,
            name: attribute.attribute_values.name,
            parent_id: Parent_id,
          };
          if (newNames[`${attribute.name}`]) {
            const value = newNames[attribute.name];
            index = value.findIndex(
              (val: any) => val.id === attribute_value.id
            );
            if (index < 0) {
              newNames[`${attribute.name}`].push(attribute_value);
            }
          } else {
            newNames[`${attribute.name}`] = [attribute_value];
          }
        }
    }
    setNames(newNames);
    setIsChange(false);
  }, [detailsState]);

  useEffect(() => {
    setNewCart([]);
    let attributValueID: number[] = [];
    let attributeValueNumber: any = [];
    detailsState.variations.map((variation) => {
      if (variation.attributes && variation.attributes?.length > 0) {
        variation.attributes?.map((attribut) => {
          attributValueID.push(attribut.attribute_values.id);
          setBoolAttributeValue((prev) => ({
            ...prev,
            [attribut.attribute_values.id]: false,
          }));
        });

        attributeValueNumber.push(attributValueID);
        attributValueID = [];
      }
      if (variation.is_default) {
        setVariationState(variation);
      }
    });
    setAttributeValueNumber(attributeValueNumber);
  }, [detailsState]);

  useEffect(() => {
    setSelectedAttributes([]);
    variationState.attributes?.map((attribute) => {
      setSelectedAttributes((prev) => [...prev, attribute.attribute_values.id]);
    });
  }, [variationState]);

  useEffect(() => {
    let arrayOfArrays: any = [];
    let errorCount: number = 0;

    if (
      attributeValueNumbers &&
      attributeValueNumbers.length > 0 &&
      selectedAttributes &&
      selectedAttributes.length > 0
    ) {
      for (let i = 0; i < attributeValueNumbers.length; i++) {
        errorCount = 0;
        const attribute = [...attributeValueNumbers[i]];

        for (let j = 0; j < attribute.length; j++) {
          const selectedAttribute = selectedAttributes[j];
          const valueAttribute = attribute[j];
          if (selectedAttribute !== valueAttribute) {
            errorCount++;
          }
        }
        //most be ===1
        if (errorCount === 1) {
          arrayOfArrays.push(attribute);
        }
      }
    }
    setNewArrayOFArry(arrayOfArrays);
  }, [
    selectedAttributes,
    attributeValueNumbers,
    variationState,
    attributeToSetVAriation,
  ]);

  useEffect(() => {
    detailsState.variations.map((variation) => {
      if (variation.attributes && variation.attributes?.length > 0) {
        variation.attributes?.map((attribut) => {
          setBoolAttributeValue((prev) => ({
            ...prev,
            [attribut.attribute_values.id]: false,
          }));
        });
      }
    });
    Object.keys(boolAttributeValue).map((key) => {
      newArrayOFArray.map((array: number[]) => {
        array.map((attributeValue) => {
          if (attributeValue === +key) {
            setBoolAttributeValue((prev) => ({ ...prev, [key]: true }));
          }
        });
      });
    });
  }, [newArrayOFArray, variationState, attributeToSetVAriation]);

  const handelAttribute = (value: { id: number; parent_id: number }) => {
    let num: { id: number; parent: number } = { id: -1, parent: -1 };
    num = { id: value.id, parent: value.parent_id };
    setAttributesToSetVAriation(num);
  };

  useEffect(() => {
    let count = selectedAttributes.length;
    let countArray = 0;
    let checked: [] = [];
    newArrayOFArray?.map((array: any) => {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === attributeToSetVAriation?.id) {
          if (array[i] !== selectedAttributes[i]) {
            countArray++;
          }
        }
      }
      if (countArray === 1) {
        checked = array;
      }
    });
    let num = checked.findIndex(
      (check) => check === attributeToSetVAriation?.id
    );
    if (num >= 0 && checked.length > 0) {
      let same: number = 1;
      detailsState.variations.map((variation) => {
        same = 0;
        if (variation.attributes?.length !== 0) {
          //@ts-ignore
          for (let i = 0; i < variation.attributes?.length; i++) {
            //@ts-ignore
            const attribute = variation.attributes[i];
            if (attribute.attribute_values.id === checked[i]) {
              same++;
            }
          }
          if (same === count) {
            setVariationState(variation);
          }
        }
      });
    }
    if (num < 0) {
      detailsState.variations.map((variation) => {
        if (attributeToSetVAriation?.id) {
          variation.attributes?.map((attribute) => {
            if (
              attribute.id === attributeToSetVAriation.parent &&
              attribute.attribute_values.id === attributeToSetVAriation.id
            ) {
              setVariationState(variation);
            }
          });
        }
      });
    }
  }, [attributeToSetVAriation]);

  //for button

  const handelTtrackingType = (id: number) => {
    let canAdd = false;
    if (detailsState.product.tracking_type === 1) {
      canAdd = true;
    } else {
      let indexcart = newCart.findIndex((item) =>
        //  item.variation_id === id
        {
          if (modifiersId === 0) {
            return item.variation_id === id;
          } else if (modifiersId !== 0) {
            return (
              item.variation_id === id &&
              item.modifierGroups?.find((mid) => mid === modifiersId) !==
                undefined
            );
          }
        }
      );
      if (newCart[indexcart]?.quantity !== variationState.available_quantity) {
        canAdd = true;
      } else if (
        newCart[indexcart]?.quantity === variationState.available_quantity
      ) {
        canAdd = false;
      } else if ((variationState.available_quantity = 0)) {
        canAdd = false;
      }
    }
    return canAdd;
  };

  const CartButton = (id: number) => {
    if (variationState.in_stock < 1) {
      return (
        <p className="text-sm block text-red-950 h-[24px]">
          this product is not available now !!
        </p>
      );
    } else if (variationState.in_stock === 1) {
      if (detailsState.product.tracking_type === 1) {
        let indexcart: number;
        indexcart = newCart.findIndex((item) =>
          //  item.variation_id === id
          {
            if (modifiersId === 0) {
              return item.variation_id === id;
            } else if (modifiersId !== 0) {
              return (
                item.variation_id === id &&
                item.modifierGroups?.find((mid) => mid === modifiersId) !==
                  undefined
              );
            }
          }
        );
        if (indexcart >= 0) {
          return (
            <div className="flex items-center space-x-3">
              <div className="flex  sapce-x-2   ">
                <BaseButton
                  //@ts-ignore
                  onClick={() => handleRemoveFromCart(newCart[indexcart].id)}
                  className="bg-[#f2f2f2] rounded-full w-6 h-6 disabled:opacity-50"
                  disabled={newCart[indexcart].quantity === 1 ? true : false}
                >
                  <MinusIcon className="w-3 text-center ml-1.5  " />
                </BaseButton>

                <p className=" w-[35px] text-center">
                  {newCart[indexcart].quantity}
                </p>

                <BaseButton
                  disabled={handelTtrackingType(id) ? false : true}
                  onClick={() => handleAddToCart(detailsState)}
                  className="bg-[#f2f2f2] rounded-full w-6 h-6 disabled:opacity-50"
                >
                  <BlusIcon className="w-3 text-center ml-1.5  " />
                </BaseButton>
              </div>
            </div>
          );
        }
      } else if (detailsState.product.tracking_type === 2 || 3) {
        if (variationState.available_quantity === 0) {
          return (
            <p className="text-sm block text-red-950 h-[24px]">
              this product is not available now !!
            </p>
          );
        } else if (variationState.available_quantity > 0) {
          let indexcart: number;
          indexcart = newCart.findIndex((item) =>
            //  item.variation_id === id
            {
              if (modifiersId === 0) {
                return item.variation_id === id;
              } else if (modifiersId !== 0) {
                return (
                  item.variation_id === id &&
                  item.modifierGroups?.find((mid) => mid === modifiersId) !==
                    undefined
                );
              }
            }
          );
          if (indexcart >= 0) {
            return (
              <div className="flex items-center space-x-3">
                <div className="flex  sapce-x-2   ">
                  <BaseButton
                    //@ts-ignore
                    onClick={() => handleRemoveFromCart(newCart[indexcart].id)}
                    className="bg-[#f2f2f2] rounded-full w-6 h-6 disabled:opacity-50"
                    disabled={newCart[indexcart].quantity === 1 ? true : false}
                  >
                    <MinusIcon className="w-3 text-center ml-1.5  " />
                  </BaseButton>

                  <p className=" w-[35px] text-center">
                    {newCart[indexcart].quantity}
                  </p>

                  <BaseButton
                    disabled={handelTtrackingType(id) ? false : true}
                    onClick={() => handleAddToCart(detailsState)}
                    className="bg-[#f2f2f2] rounded-full w-6 h-6 disabled:opacity-50"
                  >
                    <BlusIcon className="w-3 text-center ml-1.5  " />
                  </BaseButton>
                </div>
                <span className="text-xs text-[#999999]">
                  only {variationState.available_quantity} available
                </span>
              </div>
            );
          }
        }
      }
    }
  };

  const finallAddtoCart = async () => {
    newCart.map(async (item) => {
      setLoading(true);
      if (item.product) {
        const res = await addToCart(
          token,
          1,
          item.product?.id,
          item.variation_id,
          1,
          1,
          item.modifierGroups,
          item.quantity,
          "item"
        );
      }
    });
    const response = await getCartItems(token,selectedBranch.id);
    if (response === null) {
    } else {
      setCarts(response.result.items);
    }
    const res = await getCartItems(token,selectedBranch.id);
    if (res === null) {
    } else {
      setAllCartsInfo(res.result);
    }
    if (res) {
      setLoading(false);
    }
    if (response) {
      setMoveToCartPageModalState(true);
    }
  };

  const getbg = (id: number) => {
    let isfound = false;
    Object.keys(boolAttributeValue).forEach((key) => {
      const val = boolAttributeValue[+key];
      if (+key === id) {
        isfound = val;
      }
    });
    return isfound;
  };

  const handelHeart = (id: number) => {
    let isFound = false;
    for (let item of wishList) {
      if (wishList.length === 0) return isFound;
      else if (item.variation?.id === id) {
        return (isFound = true);
      }
    }
    return isFound;
  };

  const removeFromWishList = async (Variat: Variation) => {
    const index = wishList.findIndex(
      (item) => item.variation?.id === Variat.id
    );
    setRemoveLoading(true);
    if (index !== -1) {
      const id = wishList[index].id;
      if (id) {
        const res = await deleteWishList(token, id);
        if (res) {
          setRemoveLoading(false);
        }
      }
    }
    const response = await getWishList(token);
    if (response === null) {
    } else {
      setWishList(response.result.items);
    }
  };

  return (
    <div
      className={`shadow-[0_0_5px_rgba(0,0,0,0.12)] rounded-md tracking-[0.03em] mb-8 ${
        selectedAttributes.length !== 0 && "pb-14"
      }`}
    >
      <div
        className={`mx-5 space-y-4  pt-5   pb-10 ${
          selectedAttributes.length !== 0 && "border-b"
        }`}
      >
        <h1 className=" text-xl font-bold text-[#7A7A7A]">
          {detailsState.product.name}
        </h1>
        <p className="text-lg font-medium ">
          {detailsState.product.short_description}
        </p>
        <span className="text-[22px] font-semibold">
          Price : ${variationState.price}
        </span>
        {CartButton(variationState.id)}
        {variationState.id > 0 && (
          <div className="flex sm:flex-col md:flex-row sm:justify-center md:justify-start sm:space-y-3 md:space-y-0 items-center md:space-x-4">
            {!loading ? (
              <BaseButton
                disabled={
                  variationState.in_stock === 0
                    ? true
                    : detailsState.product.tracking_type === 1
                    ? false
                    : detailsState.product.tracking_type === 2 &&
                      variationState.available_quantity === 0
                    ? true
                    : detailsState.product.tracking_type === 3 &&
                      variationState.available_quantity === 0
                    ? true
                    : false
                }
                onClick={() =>
                  token.length > 1
                    ? finallAddtoCart()
                    : setContinueAsGuestModal(true)
                }
                className={`text-white whitespace-nowrap  bg-green-950 tracking-[0.095em] px-3 py-1 rounded-full disabled:cursor-not-allowed disabled:bg-gray-500`}
              >
                <CartIcon className="w-[19px] mb-0.5 mr-2 fill-white inline-block" />
                Add To Cart
              </BaseButton>
            ) : (
              <div className="w-[162.55px] flex justify-center">
                <Spinner className="w-5 fill-green-950" />
              </div>
            )}

            {!removeLoading ? (
              <div>
                {wishList.length === 0 ? (
                  <BaseButton
                    onClick={() =>
                      token.length > 1
                        ? setOpenAddToWishList(true)
                        : setContinueAsGuestModal(true)
                    }
                    className=" bg-gray-400 whitespace-nowrap  px-3 py-1 rounded-full text-white"
                  >
                    <HeartIcon className="w-4 mr-1 fill-white mb-0.5 cursor-pointer inline-block " />
                    Add to Wishlist
                  </BaseButton>
                ) : (
                  <div>
                    {variationState.id && handelHeart(variationState.id) ? (
                      <BaseButton
                        onClick={() =>
                          variationState && removeFromWishList(variationState)
                        }
                        className=" bg-gray-400 whitespace-nowrap px-3 py-1 rounded-full text-white"
                      >
                        <RedHeartIcon className="w-4 mr-1 fill-white mb-0.5 cursor-pointer inline-block " />
                        Add to Wishlist
                      </BaseButton>
                    ) : (
                      <BaseButton
                        onClick={() => setOpenAddToWishList(true)}
                        className=" bg-gray-400 px-3 py-1 whitespace-nowrap rounded-full text-white"
                      >
                        <HeartIcon className="w-4 mr-1 fill-white mb-0.5 cursor-pointer inline-block " />
                        Add to Wishlist
                      </BaseButton>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-[161.22px] flex justify-center items-center">
                <Spinner className="w-7 fill-green-950" />
              </div>
            )}
          </div>
        )}
      </div>
      <div className={`ml-4`}>
        {Object.keys(names).map((key) => {
          const values = names[key];
          return (
            <div key={uuidv4()}>
              <div>
                <h1 className="font-bold mt-5">{key}</h1>
                <div className="flex space-x-3">
                  {values.map((value: any) => {
                    return (
                      <BaseButton
                        key={uuidv4()}
                        onClick={() => handelAttribute(value)}
                        className={`
                        ${
                          selectedAttributes.findIndex(
                            (item: number) => item === value.id
                          ) > -1 &&
                          " text-green-950 bg-[#19cb3529] font-semibold"
                          // : "text-[#aaa] bg-[#f8f8f8] font-semibold"
                        } 
                        ${
                          getbg(value.id) &&
                          selectedAttributes.findIndex(
                            (item: number) => item === value.id
                          ) === -1
                            ? "bg-blue-200 text-blue-500 font-semibold"
                            : selectedAttributes.findIndex(
                                (item: number) => item === value.id
                              ) === -1 && "bg-[#f8f8f8] text-[#aaa]"
                        }
                          mt-2 rounded-md cursor-pointer px-3 py-0.5    hover:border-black`}
                      >
                        {value.name}
                      </BaseButton>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-4 mt-10">{render}</div>
      <div className="px-4 mt-5">{modifiersRender}</div>
      <AddToWishList />
    </div>
  );
};

export default DetailsCard;
