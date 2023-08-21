import string
import pandas as pd
import streamlit as st
import plotly.express as px
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import matplotlib.pyplot as plt

# Download NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

# Function to load SMS dataset
def SMS_ds():
    dataset_name = 'SMS'
    df = pd.read_csv("datasets/SMS_Spam.txt", sep='\t', names=['label', 'message'], encoding='latin-1') 
    df['label'].replace({"ham": 0, "spam": 1}, inplace=True) 
    df = df[['message', 'label']]
    return dataset_name, df

# Function to load Twitter dataset
def Twitter_ds():
    dataset_name = 'Twitter'
    df = pd.read_csv("datasets/Twitter_Spam.csv")
    df.drop(["Id", "following", "followers", "actions", "is_retweet", "location"], inplace=True, axis=1)
    df["Type"].replace({"Quality": 0, "Spam": 1}, inplace=True)
    df.rename({"Type": "label", "Tweet": "message"}, axis=1, inplace=True)
    return dataset_name, df

# Function to load YouTube dataset
def youTube_ds():
    dataset_name = 'YouTube'
    df = pd.read_csv("datasets/YouTube_Spam.csv", encoding='latin-1')
    df.drop(["COMMENT_ID", "AUTHOR", "DATE"], inplace=True, axis=1) 
    df.rename({"CLASS": "label", "CONTENT": "message"}, axis=1, inplace=True)
    return dataset_name, df

# Function to clean text data
def clean_dataset(sentence): 
    stop_words = set(stopwords.words('english'))
    sentence = sentence.translate(str.maketrans('', '', string.punctuation))
    tokens = word_tokenize(sentence)
    cleaned_sentence = [word for word in tokens if word not in stop_words]
    return " ".join(cleaned_sentence[:30])

# Streamlit app
def main():
    st.title("Dataset Visualization App")
    
    # Load datasets
    SMS_dataset_name, df_sms = SMS_ds()
    TW_dataset_name, df_twitter = Twitter_ds()
    YT_dataset_name, df_youtube = youTube_ds()
    
    # Preprocess data
    df_youtube["cleaned_message"] = df_youtube["message"].apply(clean_dataset)
    df_twitter["cleaned_message"] = df_twitter["message"].apply(clean_dataset)
    df_sms["cleaned_message"] = df_sms["message"].apply(clean_dataset)
    
    # Select dataset and column
    dataset_option = st.selectbox("Select Dataset", [YT_dataset_name, TW_dataset_name, SMS_dataset_name])
    column_option = st.selectbox("See the ditrbution of the dataset before or after preprocessing", ['Before Processing', 'After Processing'])
    
    # Plot options
    plot_options = st.selectbox("Select Plot Function", ['Histogram', 'Scatter'])
    color_scheme = st.selectbox("Select Color Scheme", px.colors.named_colorscales())
    

     
  # Display plot based on user selections
    if plot_options == 'Histogram':
        if column_option == 'Before Processing':
            plot_histogram(df_sms, dataset_option, 'message', column_option, color_scheme)
        elif column_option == 'After Processing':
            plot_histogram(df_sms, dataset_option, 'cleaned_message', column_option, color_scheme)

            
    elif plot_options == 'Scatter':
        if column_option == 'Before Processing':
            plot_scatter(df_sms, dataset_option, 'message', column_option, color_scheme)
        elif column_option == 'After Processing':
            plot_scatter(df_sms, dataset_option, 'cleaned_message', column_option, color_scheme)

# Scatter plot function
def plot_scatter(df, dataset_name, column_name, title_prefix, color_scheme):
    word_counts = df[column_name].apply(lambda x: len(word_tokenize(x)))

    fig = px.scatter(
        x=word_counts.index,
        y=word_counts,
        color=word_counts,  
        color_continuous_scale=color_scheme,
        title=f"The scatter plot of the {dataset_name} dataset based on the number of words in each instance {title_prefix} preprocessing",
        labels={"x": "Instance Index", "y": "Instance Length (Number of Words)"}
    )

    fig.update_layout(
        xaxis_title="Instance Index",
        yaxis_title="Instance Length (Number of Words)",
        title_font_size=20,
        font=dict(size=14),
        width=1200,
        height=500,
    )

    st.plotly_chart(fig)






# Bar plot function
def plot_histogram(df, dataset_name, column_name, title_prefix, color_scheme):
    word_counts = df[column_name].apply(lambda x: len(word_tokenize(x)))

    word_counts_freq = word_counts.value_counts().sort_index()

    fig = px.bar(
        x=word_counts_freq.index,
        y=word_counts_freq,
        color=word_counts_freq,  
        color_continuous_scale=color_scheme,
        title=f"The distribution of the {dataset_name} dataset based on the number of words in each instance {title_prefix} preprocessing",
        labels={"x": "Instance Length (Number of Words)", "y": "Frequency"}
    )

    # ... (rest of the plot layout customization)

    st.plotly_chart(fig)
    
# Run the Streamlit app
if __name__ == "__main__":
    main()
