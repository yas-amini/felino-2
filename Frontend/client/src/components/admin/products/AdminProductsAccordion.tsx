import { useState } from "react";
import AdminButton from "../shared/AdminButton";
import "./AdminProductsAccordion.css";

export type AdminProductItem = {
  id: number;
  categoryId?: string | null;
  name: string;
  ingredients: string;
  price: string;
  sauce?: string | null;
  altText?: string | null;
  imageUrl?: string | null;
};

type Props = {
  products: AdminProductItem[];
  onEdit: (product: AdminProductItem) => void;
  onDelete: (product: AdminProductItem) => void;
  onSave?: (product: AdminProductItem) => void;
};

export default function AdminProductsAccordion({
  products,
  onEdit,
  onDelete,
  onSave,
}: Props) {
  const [openIds, setOpenIds] = useState<number[]>([]);

  function toggleRow(id: number) {
    setOpenIds((prev) =>
      prev.includes(id)
        ? prev.filter((openId) => openId !== id)
        : [...prev, id]
    );
  }

  function openAll() {
    setOpenIds(products.map((product) => product.id));
  }

  function closeAll() {
    setOpenIds([]);
  }

  if (products.length === 0) {
    return <p className="muted">Inga produkter i denna kategori ännu.</p>;
  }

  const allOpen = products.length > 0 && openIds.length === products.length;

  return (
    <div className="adminProductsAccordion">
      <div className="adminProductsAccordionToolbar">
        <AdminButton
          variant="ghost"
          size="sm"
          type="button"
          onClick={openAll}
          disabled={allOpen}
        >
          Öppna alla
        </AdminButton>

        <AdminButton
          variant="ghost"
          size="sm"
          type="button"
          onClick={closeAll}
          disabled={openIds.length === 0}
        >
          Stäng alla
        </AdminButton>
      </div>

      {products.map((product) => {
        const isOpen = openIds.includes(product.id);

        return (
          <article
            key={product.id}
            className={`adminProductAccordionItem ${
              isOpen ? "adminProductAccordionItem--open" : ""
            }`}
          >
            <div className="adminProductAccordionTop">
              <div className="adminProductAccordionTitleWrap">
                <h4 className="adminProductAccordionTitle">{product.name}</h4>
              </div>

              <div className="adminProductAccordionActions">
                {onSave ? (
                  <AdminButton
                    preset="icon-save"
                    size="sm"
                    type="button"
                    aria-label={`Spara ${product.name}`}
                    title="Spara"
                    onClick={() => onSave(product)}
                  />
                ) : null}

                <AdminButton
                  preset="edit"
                  size="sm"
                  type="button"
                  aria-label={`Redigera ${product.name}`}
                  title="Redigera"
                  onClick={() => onEdit(product)}
                />

                <AdminButton
                  preset="delete"
                  size="sm"
                  type="button"
                  aria-label={`Ta bort ${product.name}`}
                  title="Ta bort"
                  onClick={() => onDelete(product)}
                />

                <AdminButton
                  preset="toggle"
                  size="sm"
                  type="button"
                  aria-label={
                    isOpen
                      ? `Dölj info för ${product.name}`
                      : `Visa info för ${product.name}`
                  }
                  aria-expanded={isOpen}
                  title={isOpen ? "Dölj info" : "Visa info"}
                  onClick={() => toggleRow(product.id)}
                  className={isOpen ? "is-open" : ""}
                />
              </div>
            </div>

            {isOpen && (
              <div className="adminProductAccordionBody">
                <div className="adminProductAccordionGrid">
                  <div>
                    <span className="adminProductAccordionLabel">
                      Ingredienser
                    </span>
                    <p>{product.ingredients || "—"}</p>
                  </div>

                  <div>
                    <span className="adminProductAccordionLabel">Pris</span>
                    <p>{product.price || "—"}</p>
                  </div>

                  {product.sauce ? (
                    <div>
                      <span className="adminProductAccordionLabel">Sås</span>
                      <p>{product.sauce}</p>
                    </div>
                  ) : null}

                  {product.altText ? (
                    <div>
                      <span className="adminProductAccordionLabel">
                        Alt-text
                      </span>
                      <p>{product.altText}</p>
                    </div>
                  ) : null}

                  {product.imageUrl ? (
                    <div className="adminProductAccordionWide">
                      <span className="adminProductAccordionLabel">Bild</span>
                      <img
                        className="adminProductAccordionImage"
                        src={product.imageUrl}
                        alt={product.altText || product.name}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}