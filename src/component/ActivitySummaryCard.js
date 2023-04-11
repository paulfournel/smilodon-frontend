import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBicycle, faRunning, faSwimmer} from '@fortawesome/free-solid-svg-icons';

export function ActivitySummaryCard() {
    return (
        <div className="card">
            <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="#running" role="tab" data-toggle="tab">
                            <FontAwesomeIcon icon={faRunning} className="tab-icon"/>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#cycling" role="tab" data-toggle="tab">
                            <FontAwesomeIcon icon={faBicycle} className="tab-icon"/>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#swimming" role="tab" data-toggle="tab">
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
                                <span>26.7 / 50 km</span>
                                <small>This Week</small>
                            </div>
                            <div className="card-info-item">
                                <span>2h 34m</span>
                                <small>Time</small>
                            </div>
                            <div className="card-info-item">
                                <span>144 m</span>
                                <small>Elevation Gain</small>
                            </div>
                        </div>
                        <div className="card-info">
                            <div className="card-info-item">
                                <span>387 / 2,500 km</span>
                                <small>This Year</small>
                            </div>
                            <div className="card-info-item">
                                <span>243 km behind pace</span>
                                <small>Goal Progress</small>
                            </div>
                        </div>
                        <div className="card-footer">
                            <a href="#" className="card-link">Manage Your Goals</a>
                        </div>
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
