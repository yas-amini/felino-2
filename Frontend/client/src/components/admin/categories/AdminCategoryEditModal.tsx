import { useMemo, useState } from "react";
import AdminModal from "../shared/AdminModal";
import AdminButton from "../shared/AdminButton";
import AdminCategoryForm from "./AdminCategoryForm";
import type { AdminCategoryFormValues } from "./AdminCategoryForm";
import type { Category } from "../../../types/category";
import type { ProductDto } from "../../../types/product";
import "./AdminCategoryEditModal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AdminCategoryFormValues) => void | Promise<void>;
  onRemoveProduct: (productId: number) => void | Promise<void>;
  onAssignProduct: (productId: number) => void | Promise<void>;
  isSubmitting?: boolean;
  isRemovingProduct?: boolean;
  isAssigningProduct?: boolean;
  category?: Category | null;
  uncategorizedProducts?: ProductDto[];
};

export default function AdminCategoryEditModal({
  isOpen,
  onClose,
  onSubmit,
  onRemoveProduct,
  onAssignProduct,
  isSubmitting = false,
  isRemovingProduct = false,
  isAssigningProduct = false,
  category,
  uncategorizedProducts = [],
}: Props) {
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [uncategorizedSearchTerm, setUncategorizedSearchTerm] = useState("");

  const filteredCategoryProducts = useMemo(() => {
    const products = category?.products ?? [];
    const normalizedSearch = categorySearchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return products;
    }

    return products.filter((product) => {
      const haystack = [
        product.name,
        product.sauce ?? "",
        product.altText ?? "",
        product.slug,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [category?.products, categorySearchTerm]);

  const filteredUncategorizedProducts = useMemo(() => {
    const normalizedSearch = uncategorizedSearchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return uncategorizedProducts;
    }

    return uncategorizedProducts.filter((product) => {
      const haystack = [
        product.name,
        product.ingredients,
        product.sauce ?? "",
        product.altText ?? "",
        product.slug,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [uncategorizedProducts, uncategorizedSearchTerm]);

  const isBusy = isSubmitting || isRemovingProduct || isAssigningProduct;

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Redigera kategori"
      size="lg"
    >
      <div className="adminCategoryEditModal">
        <AdminCategoryForm
          submitLabel="Spara ändringar"
          onCancel={onClose}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          initialValues={{
            name: category?.name ?? "",
            slug: category?.slug ?? "",
            description: category?.description ?? "",
            imageUrl: category?.imageUrl ?? "",
          }}
        />

        <section className="adminCategoryEditModal__products">
          <div className="adminCategoryEditModal__productsHeader">
            <div>
              <h3 className="adminCategoryEditModal__productsTitle">
                Produkter i kategorin
              </h3>
              
              <p className="adminCategoryEditModal__productsMeta">
                {category?.products.length ?? 0} produkter totalt
              </p>
            </div>

            <div className="adminCategoryEditModal__searchWrap">
              <input
                type="text"
                className="adminCategoryEditModal__searchInput"
                placeholder="Sök produkt i kategorin..."
                value={categorySearchTerm}
                onChange={(e) => setCategorySearchTerm(e.target.value)}
                disabled={isBusy}
              />
            </div>
          </div>

          {!category || category.products.length === 0 ? (
            <p className="adminCategoryEditModal__empty">
              Inga produkter i denna kategori ännu.
            </p>
          ) : filteredCategoryProducts.length === 0 ? (
            <p className="adminCategoryEditModal__empty">
              Inga produkter matchar din sökning.
            </p>
          ) : (
            <div className="adminCategoryEditModal__productList">
              {filteredCategoryProducts.map((product) => (
                <article
                  key={product.id}
                  className="adminCategoryEditModal__productRow"
                >
                  <div className="adminCategoryEditModal__productMain">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.altText || product.name}
                        className="adminCategoryEditModal__productImage"
                      />
                    ) : (
                      <div className="adminCategoryEditModal__productImage adminCategoryEditModal__productImage--placeholder">
                        <span>Ingen bild</span>
                      </div>
                    )}

                    <div className="adminCategoryEditModal__productText">
                      <h4 className="adminCategoryEditModal__productName">
                        {product.name}
                      </h4>

                      <p className="adminCategoryEditModal__productMeta">
                        {product.price} kr
                      </p>
                    </div>
                  </div>

                  <div className="adminCategoryEditModal__productActions">
                    <AdminButton
                      preset="delete"
                      size="sm"
                      type="button"
                      title="Ta bort från kategori"
                      aria-label={`Ta bort ${product.name} från kategorin`}
                      onClick={() => onRemoveProduct(product.id)}
                      disabled={isBusy}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

<section className="adminCategoryEditModal__products">
  <div className="adminCategoryEditModal__productsHeader">
    <div>
      <h3 className="adminCategoryEditModal__productsTitle">
        Okategoriserade produkter
      </h3>

      <p className="adminCategoryEditModal__productsDescription">
        Klicka på + för att lägga till okategoriserad produkt i kategorin.
      </p>

      <p className="adminCategoryEditModal__productsMeta">
        {uncategorizedProducts.length} produkter totalt
      </p>
    </div>

            <div className="adminCategoryEditModal__searchWrap">
              <input
                type="text"
                className="adminCategoryEditModal__searchInput"
                placeholder="Sök okategoriserad produkt..."
                value={uncategorizedSearchTerm}
                onChange={(e) => setUncategorizedSearchTerm(e.target.value)}
                disabled={isBusy}
              />
            </div>
          </div>

          {uncategorizedProducts.length === 0 ? (
            <p className="adminCategoryEditModal__empty">
              Det finns inga okategoriserade produkter.
            </p>
          ) : filteredUncategorizedProducts.length === 0 ? (
            <p className="adminCategoryEditModal__empty">
              Inga okategoriserade produkter matchar din sökning.
            </p>
          ) : (
            <div className="adminCategoryEditModal__productList">
              {filteredUncategorizedProducts.map((product) => (
                <article
                  key={product.id}
                  className="adminCategoryEditModal__productRow"
                >
                  <div className="adminCategoryEditModal__productMain">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.altText || product.name}
                        className="adminCategoryEditModal__productImage"
                      />
                    ) : (
                      <div className="adminCategoryEditModal__productImage adminCategoryEditModal__productImage--placeholder">
                        <span>Ingen bild</span>
                      </div>
                    )}

                    <div className="adminCategoryEditModal__productText">
                      <h4 className="adminCategoryEditModal__productName">
                        {product.name}
                      </h4>

                      <p className="adminCategoryEditModal__productMeta">
                        {product.price} kr
                      </p>
                    </div>
                  </div>

                  <div className="adminCategoryEditModal__productActions">
                    <AdminButton
                      preset="add"
                      size="sm"
                      type="button"
                      title="Lägg till i kategori"
                      aria-label={`Lägg till ${product.name} i kategorin`}
                      onClick={() => onAssignProduct(product.id)}
                      disabled={isBusy}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminModal>
  );
}