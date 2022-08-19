await page.goto('https://shop.hyundai.com/');
  // Click img[alt="\[오아\] \[오아\] 클린벨 핸디형 무선 청소기"]
  await page.locator('img[alt="\\[오아\\] \\[오아\\] 클린벨 핸디형 무선 청소기"]').click();
  await expect(page).toHaveURL('https://hyundai.auton.kr/product/category/product_view2/81385?parentid=4434&rootid=4433');
  // Click text=검색 마이페이지 장바구니 #투데이베스트스토리My Car현대브랜드관포인트샵자동차용품선물하기기획전Wheelping >> h1 button
  await page.locator('text=검색 마이페이지 장바구니 #투데이베스트스토리My Car현대브랜드관포인트샵자동차용품선물하기기획전Wheelping >> h1 button').click();
  await expect(page).toHaveURL('https://shop.hyundai.com/');
  // Click #best_list1 div:has-text("05") >> nth=1
  await page.locator('#best_list1 div:has-text("05")').nth(1).click();
  await expect(page).toHaveURL('https://shop.hyundai.com/pointshop/shop?action=product&seq=B3D774D70EA28453D02314DF1546B287C457F59093A07F7F38DDD600AD5616CD');
  // Click text=구매정보
  await page.locator('text=구매정보').click();
  // Click text=My Car
  await page.locator('text=My Car').click();
  await expect(page).toHaveURL('https://hyundai.auton.kr/submain/mycar');