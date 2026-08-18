from ..app import db
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime


class CoreFinancialInclusion(db.Model):
    """Normalized financial inclusion indicators (one row per indicator value)"""
    __tablename__ = 'cb_core_financial_inclusion'

    id = Column(Integer, primary_key=True)

    # Contextual info
    countrynewwb = Column(String)
    codewb = Column(String)
    continent = Column(String)
    africanunion_region = Column(String)
    year = Column(Integer)
    pop_adult = Column(Float)
    regionwb24_hi = Column(String)
    incomegroupwb24 = Column(String)
    group = Column(String)
    group2 = Column(String)

    # Indicator info
    indicator_id = Column(Integer, ForeignKey("cb_findex_indicators.id"), nullable=False)
    series = Column(String, nullable=False)          
    indicator_name = Column(String, nullable=False)
    value = Column(Float)

    def __repr__(self):
        return f"<CoreFinancialInclusion {self.countrynewwb}-{self.year}-{self.series}>"



class FindexIndicator(db.Model):
    __tablename__ = "cb_findex_indicators"

    id = Column(Integer, primary_key=True, autoincrement=True)
    series = Column(String, nullable=False)            # Unique code
    indicator_name = Column(String, nullable=False)    # Human-readable name

    # Only keep the selected metadata columns
    short_definition = Column(String)
    source = Column(String)
    unit_of_measure = Column(String)
    periodicity = Column(String)
    reference_period = Column(String)

    # Group info
    group = Column(String, nullable=False)
    group2 = Column(String, nullable=False)

    created_at = Column(DateTime, nullable=False)
