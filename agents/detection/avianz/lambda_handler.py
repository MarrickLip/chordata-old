import gc, os, re, fnmatch
import numpy as np
import SignalProc
import Segment
import WaveletSegment
import SupportClasses
import wavio
import traceback
import time
import math

def handler(event, context): 
    return 'Hello from AWS Lambda using Python' + sys.version + ' (w/ Avianz)!'
