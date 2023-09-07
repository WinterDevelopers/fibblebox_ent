from .serializers import PollsSerializers
from polls.models import Poll


class HomePageData:

    #get the trending polls to displayed in the home page 
    def getHomePolls(self):
        polls = Poll.objects.all()
        serialize_polls = PollsSerializers(polls, many=True)
        return serialize_polls.data
        