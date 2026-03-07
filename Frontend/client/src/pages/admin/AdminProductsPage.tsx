import { useState } from "react";
import AdminPage from "../../components/admin/AdminPage";
import "./AdminProductsPage.css";
import AdminButton from "../../components/admin/AdminButton";
import AdminModal from "../../components/admin/AdminModal";

export default function AdminProductsPage() {
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <AdminPage title="Produkter">
            <section className="admin-settings" data-scope="products">
                <section id="product-create" className="admin-section">
                    <h2>Lägg till produkt</h2>

                    <form
                        id="form-create"
                        className="product-form"
                        noValidate
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="product-form__grid">
                            <div className="form-field">
                                <label className="field-label" htmlFor="prod-cat">
                                    Kategori
                                </label>
                                <select
                                    id="prod-cat"
                                    name="category"
                                    className="in select"
                                    required
                                    defaultValue=""
                                >
                                    <option value="">Välj kategori</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="kebab">Kebab</option>
                                    <option value="pasta">Pasta</option>
                                    <option value="sallad">Sallad</option>
                                    <option value="grill">Grill</option>
                                    <option value="burger">Burger</option>
                                </select>
                            </div>

                            <div className="form-field">
                                <label className="field-label" htmlFor="prod-name">
                                    Namn
                                </label>
                                <input
                                    id="prod-name"
                                    name="name"
                                    type="text"
                                    className="in text"
                                    required
                                    minLength={2}
                                    maxLength={120}
                                    placeholder="Ex. Vesuvio"
                                />
                            </div>

                            <div className="form-field form-field--wide">
                                <label className="field-label" htmlFor="prod-ings">
                                    Ingredienser (kommaseparerade)
                                </label>
                                <input
                                    id="prod-ings"
                                    name="ingredients"
                                    type="text"
                                    className="in text"
                                    maxLength={800}
                                    placeholder="tomatsås, ost, skinka"
                                />
                            </div>

                            <div className="form-field">
                                <label className="field-label" htmlFor="prod-price">
                                    Pris (SEK)
                                </label>
                                <input
                                    id="prod-price"
                                    name="price"
                                    type="number"
                                    className="in price"
                                    inputMode="decimal"
                                    min={0}
                                    step="0.01"
                                    required
                                    placeholder="99.00"
                                />
                            </div>

                            <div className="form-field">
                                <label className="field-label" htmlFor="prod-sauce">
                                    Sås (valfritt)
                                </label>
                                <input
                                    id="prod-sauce"
                                    name="sauce"
                                    type="text"
                                    className="in text"
                                    placeholder="bearnaisesås"
                                />
                            </div>

                            <div className="form-field form-field--wide">
                                <label className="field-label" htmlFor="prod-alt">
                                    Alt-text (tillgänglighet)
                                </label>
                                <input
                                    id="prod-alt"
                                    name="alt_text"
                                    type="text"
                                    className="in text"
                                    maxLength={200}
                                    placeholder="Capricciosa pizza med skinka och champinjoner"
                                />
                            </div>

                            <div className="form-field form-field--wide">
                                <label className="field-label" htmlFor="prod-image">
                                    Bild
                                </label>

                                <input
                                    id="prod-image"
                                    className="sr-only-file"
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                />

                                <div className="btn-row">
                                    <label htmlFor="prod-image">
                                        <AdminButton type="button" variant="ghost">
                                            Välj bild
                                        </AdminButton>
                                    </label>

                                    <div className="btn-row-bottom">
                                        <AdminButton preset="save" type="submit" />
                                        <AdminButton type="button" variant="cancel">
                                            Avbryt
                                        </AdminButton>
                                    </div>
                                </div>

                                <div id="prod-feedback" className="upload-feedback" aria-live="polite" />
                                <ul id="prod-preview" className="upload-preview" />
                            </div>
                        </div>
                    </form>
                </section>

                <section id="product-list" className="admin-section">
                    <h2>Aktiva produkter</h2>

                    <div className="table-wrap">
                        <table className="products-table">
                            <thead>
                                <tr>
                                    <th>Bild</th>
                                    <th>Kategori</th>
                                    <th>Namn</th>
                                    <th>Ingredienser</th>
                                    <th>Pris</th>
                                    <th>Sås</th>
                                    <th>Alt-text</th>
                                    <th>Åtgärder</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td data-label="Bild">
                                        <span className="muted">Ingen</span>
                                    </td>
                                    <td data-label="Kategori">pizza</td>
                                    <td data-label="Namn">Vesuvio</td>
                                    <td data-label="Ingredienser">tomatsås, ost, skinka</td>
                                    <td data-label="Pris">99.00</td>
                                    <td data-label="Sås">bearnaise</td>
                                    <td data-label="Alt-text">Vesuvio pizza</td>

                                    <td data-label="Åtgärder" className="actions">
                                        <AdminButton
                                            preset="icon-save"
                                            size="sm"
                                            type="button"
                                            aria-label="Spara"
                                            title="Spara"
                                        />

                                        <AdminButton
                                            preset="edit"
                                            size="sm"
                                            type="button"
                                            aria-label="Redigera"
                                            title="Redigera"
                                            onClick={() => setOpenEdit(true)}
                                        />

                                        <AdminButton
                                            preset="delete"
                                            size="sm"
                                            type="button"
                                            aria-label="Ta bort"
                                            title="Ta bort"
                                            onClick={() => setOpenDelete(true)}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={8} className="muted">
                                        Inga produkter ännu.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <AdminModal
                    isOpen={openEdit}
                    onClose={() => setOpenEdit(false)}
                    title="Redigera produkt"
                >
                    <p>Här kan du lägga formulär för att redigera produkten.</p>

                    <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                        <AdminButton
                            variant="cancel"
                            type="button"
                            onClick={() => setOpenEdit(false)}
                        >
                            Avbryt
                        </AdminButton>

                        <AdminButton
                            preset="save"
                            type="button"
                            onClick={() => setOpenEdit(false)}
                        />
                    </div>
                </AdminModal>

                <AdminModal
                    isOpen={openDelete}
                    onClose={() => setOpenDelete(false)}
                    title="Ta bort produkt"
                >
                    <p>Är du säker på att du vill ta bort Vesuvio?</p>

                    <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                        <AdminButton
                            variant="cancel"
                            type="button"
                            onClick={() => setOpenDelete(false)}
                        >
                            Avbryt
                        </AdminButton>

                        <AdminButton
                            variant="danger"
                            type="button"
                            onClick={() => setOpenDelete(false)}
                        >
                            Ta bort
                        </AdminButton>
                    </div>
                </AdminModal>
            </section>
        </AdminPage>
    );
}