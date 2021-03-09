
!draftsqlforgetAllProducts
CREATE VIEW getAllProduct AS
SELECT tblproducts.PRODUCT_ID,tblproducts.PRODUCT_NAME,tblsupplier.SUPPLIER_NAME, tblcategory.CATEGORY_NAME,tblproducts.DESCRIPTION,tblproducts.UOM,tblproducts.PRICE
FROM ((tblproducts
INNER JOIN tblsupplier ON tblproducts.SUPPLIER_ID = tblsupplier.SUPPLIER_ID)
INNER JOIN tblcategory ON tblproducts.CATEGORY_ID = tblcategory.CATEGORY_ID);