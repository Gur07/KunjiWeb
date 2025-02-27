from selenium import webdriver
from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from bs4 import BeautifulSoup
# import pandas as pd
import time
import sys
import json


URL = "https://myscheme.gov.in/"
URL_DICT = {
    1: ["Agriculture,Rural & Environment", "https://www.myscheme.gov.in/search/category/Agriculture,Rural%20&%20Environment" ],
    2: ["Banking,Financial Services and Insurance", "https://www.myscheme.gov.in/search/category/Banking,Financial%20Services%20and%20Insurance"],
    3: ["Business & Entrepreneurship", "https://www.myscheme.gov.in/search/category/Business%20&%20Entrepreneurship"],
    4: ["Education & Learning", "https://www.myscheme.gov.in/search/category/Education%20&%20Learning"],
    5: ["https://www.myscheme.gov.in/search/category/Education%20&%20Learning", "https://www.myscheme.gov.in/search/category/Health%20&%20Wellness"],
    6: ["Housing & Shelter", "https://www.myscheme.gov.in/search/category/Housing%20&%20Shelter"],
    7: ["Public Safety,Law & Justice", "https://www.myscheme.gov.in/search/category/Public%20Safety,Law%20&%20Justice"],
    8: ["Science, IT & Communications", "https://www.myscheme.gov.in/search/category/Science,%20IT%20&%20Communications"],
    9: ["Skills & Employment", "https://www.myscheme.gov.in/search/category/Skills%20&%20Employment"],
    10: ["Social welfare & Empowerment", "https://www.myscheme.gov.in/search/category/Social%20welfare%20&%20Empowerment"],
    11: ["Sports & Culture", "https://www.myscheme.gov.in/search/category/Sports%20&%20Culture"],
    12: ["Transport & Infrastructure", "https://www.myscheme.gov.in/search/category/Transport%20&%20Infrastructure"],
    13: ["Travel & Tourism", "https://www.myscheme.gov.in/search/category/Travel%20&%20Tourism"],
    14: ["Utility & Sanitation", "https://www.myscheme.gov.in/search/category/Utility%20&%20Sanitation"],
    15: ["Women and Child", "https://www.myscheme.gov.in/search/category/Women%20and%20Child"]
}

if __name__ == "__main__":
    # Get search query and genre from command line arguments
    search_query = sys.argv[1] if len(sys.argv) > 1 else None
    genre = sys.argv[2] if len(sys.argv) > 2 else None

    for (key, value) in URL_DICT:
        if URL_DICT[key][0] == genre:
            num = key
    
    USER_QUERY = search_query
    FINAL_URL = URL_DICT[num][1] # My default for the time being

    # Path to your ChromeDriver
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(FINAL_URL)
    driver.maximize_window()
    time.sleep(2)

    # Navigation
    search_bar = driver.find_element(By.XPATH, value='//*[@id="__next"]/div/main/div/div[5]/div[2]/form/input')
    search_bar.send_keys(f"{USER_QUERY}")
    time.sleep(1)
    search_button = driver.find_element(By.XPATH, value='//*[@id="__next"]/div/main/div/div[5]/div[2]/form/button[2]')
    search_button.click()

    # Data Collection
    schemes = []
    scheme_list = driver.find_elements(By.CSS_SELECTOR, value="#__next > div > main > div > div.grid.grid-cols-4.gap-4.container.mx-auto.px-4.relative > div.sm\:col-span-3.col-span-4.items-center.justify-center > div.mt-2 > div.gap-4.grid.grid-cols-1.\!grid-cols-1.md\:grid-cols-2.lg\:grid-cols-4.undefined")
    for item in scheme_list:
        raw_text = item.text
       # Split the raw text into lines
        lines = raw_text.strip().split("\n")

        # Temporary variables to hold the current scheme
        current_scheme = {
            "title": "",
           "state": "",
           "description": "",
           "list_of_tags": []
        }

        for line in lines:
            line = line.strip()  # Clean up the line
            if not current_scheme["title"]:  # Collect title
                current_scheme["title"] = line
            elif not current_scheme["state"]:  # Collect state
               current_scheme["state"] = line
           elif not current_scheme["description"]:  # Collect description
                current_scheme["description"] = line
           elif len(line.split()) < 3:  # Collect tags (1-2 words)
               current_scheme["list_of_tags"].append(line)
           else:  # New scheme starts
               # Store the current scheme
               schemes.append(current_scheme)
               # Initialize a new scheme
               current_scheme = {
                   "title": line,
                   "state": "",
                   "description": "",
                   "list_of_tags": []
               }

       # Append the last scheme
       if current_scheme["title"]:
           schemes.append(current_scheme)

    # Print the parsed schemes
    for scheme in schemes:
        print(scheme)

    # Save to a JSON file if needed
    with open("schemes.json", "w") as f:
        json.dump(schemes, f, indent=4)

    print("Data saved to schemes.json")
