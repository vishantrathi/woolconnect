import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load data from CSV file
df = pd.read_csv('user_wool_ratings.csv')

# Set user_id as index to make similarity calculations easier
df = df.set_index('user_id')

# Compute the similarity matrix based on ratings using Cosine Similarity
similarity_matrix = cosine_similarity(df.fillna(0))  # Fill NA with 0 for similarity calculation

# Create a DataFrame for similarity matrix
similarity_df = pd.DataFrame(similarity_matrix, index=df.index, columns=df.index)

def get_recommendations(user_id, num_recommendations=3):
    """
    Get wool type recommendations for a specific user based on collaborative filtering.

    Args:
    user_id (int): The user for whom we want to generate recommendations.
    num_recommendations (int): The number of wool types to recommend.
    
    Returns:
    dict: Recommended wool types with their estimated ratings.
    """
    # Get the most similar users to the current user
    similar_users = similarity_df[user_id].sort_values(ascending=False)

    # Get the top similar user (excluding the user itself)
    top_similar_user = similar_users.index[1]  # Skip the user itself, so take the second most similar user

    # Retrieve wool ratings from the top similar user
    recommended_wool = df.loc[top_similar_user].to_dict()

    # Sort the recommended wool based on ratings in descending order and select the top n recommendations
    sorted_recommendations = sorted(recommended_wool.items(), key=lambda x: x[1], reverse=True)
    
    # Get the top 'num_recommendations' recommendations
    top_recommendations = dict(sorted_recommendations[:num_recommendations])

    return top_recommendations

# Example: Get recommendations for user_id = 1
user_id = 1
recommendations = get_recommendations(user_id)

print(f"Recommendations for user {user_id}:")
for wool_type, rating in recommendations.items():
    print(f"{wool_type}: {rating}")
