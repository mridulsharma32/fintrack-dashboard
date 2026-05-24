CATEGORY_KEYWORDS = {
    "Food": ["restaurant", "zomato", "swiggy", "cafe", "coffee", "pizza"],
    "Travel": ["uber", "ola", "fuel", "metro", "train", "flight"],
    "Shopping": ["amazon", "flipkart", "myntra", "store", "mall"],
    "Bills": ["electricity", "internet", "phone", "water", "gas", "bill"],
    "Entertainment": ["netflix", "spotify", "movie", "prime", "hotstar"],
    "Education": ["course", "udemy", "book", "school", "college"],
}


def categorize_transaction(description: str) -> str:
    text = description.lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(keyword in text for keyword in keywords):
            return category
    return "Other"
