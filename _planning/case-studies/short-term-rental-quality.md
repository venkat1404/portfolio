# Case Study Outline — Predictive Modeling for Short-Term Rental Quality

**Slug:** `short-term-rental-quality`
**Homepage rank:** 2
**Target length:** 1,000–1,200 words
**GitHub:** https://github.com/venkat1404/airbnb-rental-quality-classification
**Attribution:** Team of 3 — Venkat Gollangi, Anish Rao Tumla, Rohith Kumar Tappa (BUDT 733, Spring 2026)
**Date:** Mar 2026

## Story spine

**The competition:** UMD BUDT 733 Data Mining semester project — 35 teams, given train/test CSVs of short-term rental listings, predict which listings earn a "perfect rating score." Blind test submission scored on AUC.

**Our finding:** Feature engineering did more of the work than model selection. LightGBM won only after 100+ engineered features made every model better. That's the story.

## Section-by-section beats

### TL;DR card (top, 3 lines)
- **Problem:** binary-classify short-term rental listings by whether they'll earn a perfect rating.
- **Solution:** heavy feature engineering (100+ features) → benchmark 6 model families under nested CV → LightGBM with AUC-focused tuning.
- **Result:** AUC 0.8214, +0.07 over 0.7511 baseline. Finished 8th of 35 teams.

### Overview (~110 words)
Frame Airbnb (or short-term rental) quality prediction as a real vendor decision: which listings should get promoted, which should get flagged for review. Set the stakes early so a non-DS reader gets it.

### Problem (~120 words)
The features that come in the box (price, room type, location) get you to about AUC 0.75. The competition question was really: what features can you *make* that the raw data doesn't provide? Per-person price. Amenity presence flags. Host tenure. Time-since-last-review. Text signal from descriptions.

### Business context (~90 words)
Beyond the class competition, this is exactly the modeling job vacation-rental platforms hire for: pricing, ranking, host onboarding, and fraud detection all sit on top of quality prediction models. Anchor the case study in that reality.

### Data sources (~80 words)
- `airbnb_train_x_2026.csv` — features
- `airbnb_train_y_2026.csv` — binary labels ("perfect_rating_score" = YES/NO)
- `airbnb_test_x_2026.csv` — blind test set
- External cost-of-living index for geographic price context.

### Approach (~200 words)
Walk through what we built, in the order it happened. This is where feature-engineering craft is on display:

1. **Money normalization:** `$1,234.00` strings → floats. Percent strings → floats.
2. **Skew handling:** log-transform right-skewed price columns.
3. **Amenity extraction:** 15+ binary flags for specific amenities (wifi, kitchen, AC, heating, washer, dryer, etc.) — we found these more useful than a total amenity count.
4. **Per-person pricing ratios:** `price / accommodates`. A $300 listing for 8 people is different from $300 for 1.
5. **Presence flags:** `has_cleaning_fee`, `has_security_deposit`, `has_weekly_price` — presence itself was a signal for host professionalism.
6. **Date-derived features:** host tenure in days, listing age, days since last review.
7. **Text compression:** TF-IDF vectors from 3 text columns, reduced to 25 SVD components.
8. **Target-encoded categoricals** for high-cardinality neighborhood columns.
9. **KMeans clustering** on numeric features to generate unsupervised listing-type labels.
10. **Interaction terms:** `price × accommodates`, `amenities × log_price`, etc.

### Architecture (with SVG diagram)

```
[Raw CSVs] → [Feature Engineering (100+ features)]
                     │
                     ▼
             [Preprocessing Pipeline]
              · Money/percent parse
              · Rare-category collapse (min_count=300)
              · Target encoding
              · TF-IDF + TruncatedSVD (25 comp)
              · KMeans cluster labels
                     │
                     ▼
       [Nested CV: outer 20% hold-out, inner 5-fold]
                     │
      ┌──────────┼──────────┬──────────┬──────────┐
      ▼          ▼          ▼          ▼          ▼
   LightGBM  Bagging   RF+GBM   LogReg   KNN   [+1 more]
                     │
                     ▼
      [Winner: LightGBM tuned on AUC, early stopping ×3]
                     │
                     ▼
             [AUC 0.8214 — 8th of 35]
```

### Model selection (~140 words)
Nested holdout with 5-fold inner CV — the correct pattern for both selecting and reporting model performance without leakage. Grid search across `num_leaves` and `learning_rate` for LightGBM. AUC-focused tuning with three rounds of early stopping. Interesting: Logistic Regression beat some tree ensembles when features were well-engineered — evidence for the "feature engineering > model choice" thesis.

### Challenges (~110 words)
- **Class balance:** the target distribution is uneven. Straight accuracy would be misleading — stuck with AUC as the evaluation metric.
- **High-cardinality neighborhoods:** naive one-hot blows up dimensionality. Target encoding + rare-category collapse (min 300) fixed it.
- **Text columns:** 3 free-text fields. Raw text embeds are heavy; TF-IDF + SVD to 25 components was the pragmatic compromise.
- **TODO:** which challenge actually blocked us the longest? Venkat input needed.

### Results
- **AUC 0.8214** on blind test.
- **8th of 35 teams.**
- **+0.07 over 0.7511 baseline** from feature engineering alone.
- **LightGBM beat 5 other model families** benchmarked under the same CV.

### Lessons learned (~110 words)
- **Feature engineering moved the needle far more than model choice.** Direct quote from our team.
- **Logistic regression is a real baseline, not a joke.** With good features it beat some tree ensembles here.
- **Nested CV is worth the compute cost.** It's the only clean way to select a model and estimate its performance honestly.
- **TODO:** what would we do differently? Options: try a stacked ensemble; embed text with a transformer instead of TF-IDF; get more external context data.

### Future improvements
- Stacked ensemble (LightGBM + LogReg + one more) — likely +0.01–0.02 AUC.
- Embed listing descriptions with sentence transformers instead of TF-IDF+SVD.
- SHAP for per-listing explanations.
- Calibrate probabilities so scores are usable as ranking signals.

### Prev / Next navigation
- Prev: Financial Complaint Resolution
- Next: Healthcare Fraud Detection

## Visual assets needed (Phase 2b + Phase 7)

1. **Hero visual:** feature-importance chart (top 20 features from LightGBM) — rendered from the notebook. Or a nested-CV score distribution boxplot across the 6 model families. **Phase 2b — re-run notebook, export polished chart.**
2. **Architecture SVG:** the pipeline shown above. — Phase 7.
3. **Metric bar:** big tabular-numeral display of AUC 0.8214 / 8th of 35 / +0.07 delta.

## Content gaps blocking Phase 7 for this project
- Team role split — CONTENT_GAPS.md §3.2
- Top team's AUC (for context on "8th of 35") — CONTENT_GAPS.md §3.2
- Confirm which was the actual longest-lived challenge — CONTENT_GAPS.md §3.2
- One honest reflection for Lessons Learned — CONTENT_GAPS.md §3.2
