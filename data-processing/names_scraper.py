from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
import re

driver1 = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver2 = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver1.get("http://tamilcube.com/babynames/sanskrit-baby-names.aspx")
blog_list = driver1.find_elements(By.XPATH, '//a[starts-with(@title,"Names starting with")]')

names = []
for i in blog_list:
    print(i.get_attribute('href'))
    link = i.get_attribute('href')
    driver2.get(link)
    pagination = driver1.find_elements(By.XPATH, '//*[@id="DataPager2"]/a')
    end_of_page = False
    counter = 1
    while not end_of_page:
        print(counter)
        table_rows = driver2.find_elements(By.XPATH, '//span[starts-with(@id,"ListView1_Label1")]')
        for k in table_rows:
            names.append(k.text)
        found = False
        for c in range(1, 11):
            try:
                next_comp = driver2.find_elements(By.XPATH, '//*[@id="DataPager2"]/a[{}]'.format(c))
                if next_comp[0].text == '>':
                    found = True
                    break
            except:
                continue

        if not found:
            print('Not found for page num {}'.format(counter))
            continue
        if next_comp[0].get_attribute('class') == 'aspNetDisabled pager-no':
            end_of_page = True
        else:
            next_comp[0].click()
        counter += 1
    print('Done')

with open('names_scraped.txt', 'w') as f:
    f.write('\n'.join(names))

driver1.quit()
driver2.quit()