import AdminButton from "../shared/AdminButton";
import AdminEntityCard from "../shared/AdminEntityCard";
import type { Category } from "../../../types/category";

type Props = {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
};

export default function AdminCategoryCard({
  category,
  onEdit,
  onDelete,
}: Props) {
  const productCount = category.products?.length ?? 0;

  return (
    <AdminEntityCard
      media={
        <>
          <span className="category-card__count">
            {productCount} produkter
          </span>

          {category.imageUrl ? (
            <img
              src={category.imageUrl}
              alt={category.name}
              className="category-card__image"
            />
          ) : (
            <div className="category-card__image category-card__image--placeholder">
              <span>Ingen bild</span>
            </div>
          )}
        </>
      }
      bodyTop={
        <div>
          <h3 className="category-card__title">{category.name}</h3>
          <p className="category-card__slug">/{category.slug}</p>
        </div>
      }
      description={
        <p className="category-card__description">
          {category.description}
        </p>
      }
      actions={
        <>
          <AdminButton
            preset="edit"
            size="sm"
            type="button"
            aria-label={`Redigera ${category.name}`}
            title="Redigera"
            onClick={onEdit}
          />
          <AdminButton
            preset="delete"
            size="sm"
            type="button"
            aria-label={`Ta bort ${category.name}`}
            title="Ta bort"
            onClick={onDelete}
          />
        </>
      }
    />
  );
}