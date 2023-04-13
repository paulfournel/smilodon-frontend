import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBicycle, faRunning, faSwimmer} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from "react-redux";
import {useState} from "react";
import {formatDuration} from "../utils/timeUtils";
import {WeeklyHistogram} from "./WeeklyHistogram";

export function ActivitySummaryCard() {
    const [selectedSport, setSelectedSport] = useState("Run");

    const statistics = useSelector((state) => {
        return state.user.domain.statistics.statistics
    });

    return (
        <div className="card">
            <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <a onClick={() => setSelectedSport("Run")}
                           className={`nav-link ${selectedSport === "Run" ? "active" : null}`} role="tab"
                           data-toggle="tab">
                            <FontAwesomeIcon icon={faRunning} className="tab-icon"/>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => setSelectedSport("Ride")}
                           className={`nav-link ${selectedSport === "Ride" ? "active" : null}`} role="tab"
                           data-toggle="tab">
                            <FontAwesomeIcon icon={faBicycle} className="tab-icon"/>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => setSelectedSport("Swim")}
                           className={`nav-link ${selectedSport === "Swim" ? "active" : null}`} role="tab"
                           data-toggle="tab">
                            <FontAwesomeIcon icon={faSwimmer} className="tab-icon"/>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="card-body">
                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="running">
                        <div className="card-info">
                            <div className="card-info-item">
                                <span>{(selectedSport in statistics ? statistics[selectedSport].distance / 1000 : 0).toFixed(2)} km</span>
                                <small>This Week</small>
                            </div>
                            <div className="card-info-item">
                                <span>{formatDuration(selectedSport in statistics ? statistics[selectedSport].movingTime : 0)}</span>
                                <small>Time</small>
                            </div>
                            <div className="card-info-item">
                                <span>{selectedSport in statistics ? statistics[selectedSport].totalElevationGain: 0} m</span>
                                <small>Elevation Gain</small>
                            </div>
                        </div>
                        <WeeklyHistogram data={selectedSport in statistics ?statistics[selectedSport].weeklyHistogram : {}} />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="cycling">
                        <div className="card-info">
                            <div className="card-info-item">
                                <span>XX / XX km</span>
                                <small>This Week</small>
                            </div>
                            <div className="card-info-item">
                                <span>XXh XXm</span>
                                <small>Time</small>
                            </div>
                            <div className="card-info-item">
                                <span>XX m</span>
                                <small>Elevation Gain</small>
                            </div>
                        </div>
                        <div className="card-info">
                            <div className="card-info-item">
                                <span>XX / XX km</span>
                                <small>This Year</small>
                            </div>
                            <div className="card-info-item">
                                <span>XX km behind pace</span>
                                <small>Goal Progress</small>
                            </div>
                        </div>
                        <div className="card-footer">
                            <a href="#" className="card-link">Manage Your Goals</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ActivitySummaryCard;
