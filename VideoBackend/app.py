from flask import Flask, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/videos', methods=['GET'])
def get_videos():
    # Configure Selenium with ChromeDriver
    options = Options()
    options.add_argument("--start-maximized")

    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)

    # Specify the search parameters
    topic = "finance"
    language = "hindi"
    driver.get(f'https://www.youtube.com/results?search_query=courses-on-{topic}-in-{language}-one-shot&sp=EgQQASgB')

    video_list = []
    c=0
    # Extract data from YouTube search results
    parent_divs = driver.find_elements(By.XPATH, '//*[@id="dismissible"]')
    for div in parent_divs:
        try:
            a_tag = div.find_element(By.XPATH, './/*[@id="video-title"]')
            href = a_tag.get_attribute('href')
            title = a_tag.get_attribute('title')

            img_tag = div.find_element(By.XPATH, './/*[@id="thumbnail"]//img')
            img_src = img_tag.get_attribute('src')

            # Check all conditions before adding to the list
            if href and title and img_src and 'shorts' not in href:
                c = c+1
                video_data = {
                    'id': c,
                    'title': title,
                    'thumbnail': img_src,
                    'href' : href,
                    'videoUrl': href.split("v=")[-1].split("&")[0]
                }
                video_list.append(video_data)

        except Exception as e:
            print("Error extracting data:", e)

    driver.quit()

    return jsonify(video_list)

if __name__ == '__main__':
    app.run(debug=True)
