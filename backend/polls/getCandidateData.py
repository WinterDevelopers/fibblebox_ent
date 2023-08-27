from .models import Candidate,Office,Poll
from .serializers import CandidateSerializers

from django.shortcuts import  get_object_or_404

class CandidateData():

    def __init__(self,slug):
        self.slug = slug

    def getCandidateData(self):
        
        candidates = get_object_or_404(Candidate, slug=self.slug)
        poll = get_object_or_404(Poll, id=candidates.poll.id)
        office = get_object_or_404(Office, id=candidates.office.id)
        serialized_candidates = CandidateSerializers(candidates)#add many True

        response_data = serialized_candidates.data
        response_data['office']=office.office_name
        response_data['count_down'] = poll.count_down

        return response_data