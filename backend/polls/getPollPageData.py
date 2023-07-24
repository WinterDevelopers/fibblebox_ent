from django.shortcuts import get_object_or_404, get_list_or_404

from .serializers import PollsSerializers, CandidateSerializers, OfficeSerializers
from .models import Poll, Candidate,Office


class PollData():
    def __init__(self, slug):
        self.slug = slug
        return

    def getPollData(self):
        #get the poll using the slug and serialize it to send 
        poll = get_object_or_404(Poll, slug=self.slug)
        total_votes = poll.total_votes
        serialized_poll = PollsSerializers(poll)
        #get offices under the poll above using the poll ID
        office = get_list_or_404(Office, poll=poll.id)
        obj_office_candidate = {}
        #ilitrate through the list of offices and get the candidate in those office
        #add the in the object and pair the candidate list to the office of the candidates
        for x in office:
            office_ = get_object_or_404(Office, id=x.id)
            candidate = get_list_or_404(Candidate, office=x.id)
            serialized_candidates = CandidateSerializers(candidate, many=True)
            obj_office_candidate[str(x)]={'candidate':serialized_candidates.data, 'office':office_.office_name}

        return {'poll':serialized_poll.data,'details':obj_office_candidate, 'total_votes':total_votes}